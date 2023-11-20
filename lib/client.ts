import { auth } from "@/lib/auth";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import { registerUrql } from "@urql/next/rsc";

export const authHeader = authExchange(async (utils) => {
  const session = await auth();
  return {
    addAuthToOperation(operation) {
      if (!session?.accessToken) return operation;
      return utils.appendHeaders(operation, {
        Authorization: `Bearer ${session?.accessToken}`,
      });
    },
  };
});

export const headers = {
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: () => ({ headers }),
  exchanges: [authHeader, cacheExchange, fetchExchange],
});

export const { getClient } = registerUrql(() => client);
