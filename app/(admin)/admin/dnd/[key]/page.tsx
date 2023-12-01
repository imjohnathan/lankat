import { auth } from "@/lib/auth";
import { getClient } from "@/lib/client";
import { gql } from "@urql/next";
export const dynamic = "force-dynamic";
const query = gql`
  query CheckIfUserHaveHome($where: pages_bool_exp = {}) {
    pages(where: $where) {
      id
    }
  }
`;

const mutation = gql`
  mutation AddHomePage {
    insert_pages(objects: { is_home: true, key: "home" }) {
      returning {
        id
        user
      }
    }
  }
`;

export default async function App({ params }: { params: { key: string } }) {
  const session = await auth();
  const variables = {
    where: {
      is_home: { _eq: true },
      user: { _eq: session?.id },
    },
  };
  let pageId = "";

  const { data, error } = await getClient().query(query, variables, {
    fetchOptions: { cache: "no-store" },
  });

  try {
    if (data && data?.pages.length !== 0) {
      pageId = data.pages[0].id;
    } else {
      const { data, error } = await getClient().mutation(mutation, {});
      if (data && data?.insert_pages.returning.length != 0) {
        pageId = data.insert_pages.returning[0].id;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      {params.key}
      {pageId}
      page: {JSON.stringify(data)}
    </>
  );
}
