"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserPage from "@/components/userpage";
import PreviewData from "@/lib/constants/previewData.json";
import templates from "@/lib/constants/templates.json";
import { gql, useQuery, useSubscription } from "@urql/next";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import IconLoading from "~icons/line-md/loading-twotone-loop";

const query = gql`
  query GetUserWidgets($userKey: String!) {
    widgets(
      where: {
        isShow: { _eq: true }
        userByUser: { url_key: { _eq: $userKey } }
      }
      order_by: { sort: asc }
    ) {
      id
      config
      type
      updated_at
      widgets_links(order_by: { sort: asc }, where: { isShow: { _eq: true } }) {
        ...widgets_linksFragment
      }
    }
    users(where: { url_key: { _eq: $userKey } }) {
      ...usersFragment
    }
  }

  fragment widgets_linksFragment on widgets_links {
    name
    id
    isShow
    link {
      url
      id
      key
      __typename
    }
    __typename
  }

  fragment usersFragment on users {
    display_name
    theme
    theme_selected
    id
    name
    url_key
    image
    bio
    social_links
  }
`;

const subscription = gql`
  subscription GetWidgets($userKey: String!) {
    widgets(
      where: {
        isShow: { _eq: true }
        userByUser: { url_key: { _eq: $userKey } }
      }
      order_by: { sort: asc }
    ) {
      id
      config
      type
      updated_at
      widgets_links(order_by: { sort: asc }, where: { isShow: { _eq: true } }) {
        ...widgets_linksFragment
      }
    }
  }

  fragment widgets_linksFragment on widgets_links {
    name
    id
    isShow
    link {
      url
      id
      key
      __typename
    }
    __typename
  }
`;

function Loading() {
  return (
    <div className="grid h-full min-h-screen w-full place-items-center bg-slate-100">
      <IconLoading className="h-10 w-10" />
    </div>
  );
}

export function UserPagePreview() {
  const { data: sessionData } = useSession();
  if (!sessionData) return <Loading />;
  const { key } = useParams();
  const searchParams = useSearchParams();
  const isMocking = searchParams.has("mocking");
  const userName = searchParams.has("username") && searchParams.get("username");
  const theme = searchParams.has("themeId") && searchParams.get("themeId");
  const [data, setData] = useState({ users: [], widgets: [] });
  const [{ data: queryData, fetching }] = useQuery({
    query,
    variables: {
      userKey: key,
    },
  });
  useEffect(() => {
    if (queryData && !fetching && !isMocking) {
      setData(queryData);
    }
    if (isMocking) {
      setData(PreviewData);
      if (userName) {
        setData((prev) => ({
          ...prev,
          users: [{ ...prev.users[0], display_name: userName }],
        }));
      }
      if (theme) {
        const themeData = templates.find(({ id }) => id === Number(theme));
        setData((prev) => ({
          ...prev,
          users: [{ ...prev.users[0], theme: themeData }],
        }));
      }
    }
  }, []);
  const handleSubscription = (_: any, response: any) => {
    setData((prev) => ({ ...prev, widgets: response.widgets }));
    return [response];
  };
  const [res] = useSubscription(
    {
      query: subscription,
      variables: {
        userKey: key,
      },
      pause: isMocking,
    },
    handleSubscription,
  );
  const users = data.users[0];
  if (!users || fetching) return <Loading />;
  return (
    <ScrollArea className="fixed inset-0 h-screen">
      {isMocking && <div className="fixed inset-0 h-full w-full" />}
      <UserPage users={users} widgets={data.widgets} isPreview={true} />
    </ScrollArea>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserPagePreview />
    </Suspense>
  );
}
