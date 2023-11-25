import { auth } from "@/lib/auth";
import { createClient, fetchExchange, ssrExchange } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange as graphCacheExchange } from "@urql/exchange-graphcache";
import { registerUrql } from "@urql/next/rsc";

export const authHeader = authExchange(async (utils) => {
  const session = await auth();
  return {
    addAuthToOperation(operation) {
      try {
        if (!session?.accessToken) return operation;
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${session?.accessToken}`,
        });
      } catch (e) {
        console.log(e);
      }
    },
  };
});

const cacheConfig = {
  keys: {
    Widgets: (data) => data.updated_at,
  },
  resolvers: {
    widgets: {
      updated_at: (parent, _args, cache) => {
        return new Date(cache.resolve(parent, "updated_at"));
      },
    },
  },
};

const cache = graphCacheExchange(cacheConfig);

const ssr = ssrExchange();

export const headers = {
  "x-hasura-admin-secret":
    "7lQAMFpyeVollj1jalVlpTTBQn7m7odbfSP6w29fHqIJY6b0C7g4K0cyFhG9AyYj",
};

export const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: () => ({ cache: "no-store" }),
  exchanges: [
    devtoolsExchange,
    authHeader,
    //cacheExchange,
    //cache,
    ssr,
    fetchExchange,
  ],
});

export const { getClient } = registerUrql(() => client);
