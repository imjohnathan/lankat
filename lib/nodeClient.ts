import { Client, fetchExchange } from "@urql/core";

export const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  exchanges: [fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_KEY,
      },
    };
  },
});
