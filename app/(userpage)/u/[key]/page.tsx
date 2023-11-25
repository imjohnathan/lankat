import { Card } from "@/components/ui/card";
import Bio from "@/components/userpage/Bio";
import BioButtons from "@/components/userpage/BioButtons";
import Widgets from "@/components/userpage/Widgets";
import { getClient } from "@/lib/client";
import { gql } from "@urql/next";
import { notFound } from "next/navigation";
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

export const revalidate = 1;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const getData = async (key: string) => {
  const { data, error } = await getClient().query(
    query,
    {
      userKey: key,
    },
    {
      fetchOptions: { cache: "no-store", next: { revalidate: -1 } },
    },
  );
  if (error || !data?.users.length) {
    return notFound();
  }
  return data;
};

const getDataFetch = async (key: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: ` query GetUserWidgets($userKey: String!) {
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
      }`,
      variables: {
        userKey: key,
      },
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { key: string };
}) {
  const data = await getData(params.key);
  const { display_name } = data.users[0];
  return {
    title: `${display_name} | Lank.at 任意門`,
  };
}

export default async function App({ params }: { params: { key: string } }) {
  const data = await getData(params.key);
  const users = data.users[0];
  return (
    <div className="bg-gray-100 p-4 sm:pt-16">
      <div className="mx-auto max-w-[480px]">
        <Card className="p-6">
          <BioButtons urlKey={users.url_key} />
          <Bio user={users} />
        </Card>
        <div className="mt-4">
          <Widgets widgets={data.widgets} />
        </div>
      </div>

      <code className="block overflow-hidden whitespace-break-spaces">
        {JSON.stringify(data, null, 2)}
      </code>
    </div>
  );
}
