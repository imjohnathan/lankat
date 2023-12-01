"use client";

import { devtoolsExchange } from "@urql/devtools";
import { authExchange } from "@urql/exchange-auth";
import {
  UrqlProvider,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
  subscriptionExchange,
} from "@urql/next";
import { createClient as createWSClient } from "graphql-ws";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  const { data: session } = useSession();
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const headers = {
      "x-hasura-admin-secret":
        "7lQAMFpyeVollj1jalVlpTTBQn7m7odbfSP6w29fHqIJY6b0C7g4K0cyFhG9AyYj",
    };

    const authHeader = authExchange(async (utils) => {
      return {
        addAuthToOperation(operation) {
          if (!session?.accessToken) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${session?.accessToken}`,
          });
        },
      };
    });

    const wsClient = createWSClient({
      url:
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.replace("https", "wss") ?? "",
    });

    const subscription = subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || "" };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    });

    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "",
      fetchOptions: () => ({}),
      exchanges: [
        devtoolsExchange,
        authHeader,
        cacheExchange,
        ssr,
        fetchExchange,
        subscription,
      ],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
