import { Client, fetchExchange } from "@urql/core";

const headers = {
  "x-hasura-admin-secret": process.env.HASURA_ADMIN_KEY,
};

export const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  exchanges: [fetchExchange],
  fetchOptions: () => {
    return {
      headers,
    };
  },
});
