import UserPage from '@/components/userpage';
import { client } from '@/lib/nodeClient';
import { gql } from '@urql/next';
import { notFound } from 'next/navigation';
import { NextFetchEvent, NextRequest } from 'next/server';
const query = gql`
  query GetUserWidgets($userKey: String!) {
    widgets(where: { isShow: { _eq: true }, userByUser: { url_key: { _eq: $userKey } } }, order_by: { sort: asc }) {
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
      image
    }
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

export const dynamic = 'force-dynamic';

const getData = async (key: string) => {
  const { data, error } = await client.query(
    query,
    {
      userKey: key
    },
    {
      fetchOptions: { cache: 'no-store' }
    }
  );
  if (error || !data?.users.length) {
    return notFound();
  }
  return data;
};

export async function generateMetadata({ params }: { params: { key: string } }) {
  const data = await getData(params.key);
  const { display_name } = data.users[0];
  return {
    title: `${display_name} | Lank.at 任意門`
  };
}

export default async function App(
  {
    params,
    searchParams
  }: {
    params: { key: string };
    searchParams: { [key: string]: string | string[] | undefined };
  },
  req: NextRequest,
  ev: NextFetchEvent
) {
  const data = await getData(params.key);
  const users = data.users[0];

  const isPreview = Object.hasOwn(searchParams, 'preview');

  return <UserPage users={users} widgets={data.widgets} isPreview={isPreview} />;
}
