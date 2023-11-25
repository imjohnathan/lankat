import {
  LOCALHOST_GEO_DATA,
  capitalize,
  getDomainWithoutWWW,
} from "@/lib/utils";
import { Client, fetchExchange } from "@urql/core";
import { gql } from "@urql/next";
import { NextRequest, userAgent } from "next/server";

const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  exchanges: [fetchExchange],
  fetchOptions: () => {
    return {
      headers: {
        "x-hasura-admin-secret":
          "7lQAMFpyeVollj1jalVlpTTBQn7m7odbfSP6w29fHqIJY6b0C7g4K0cyFhG9AyYj",
      },
    };
  },
});

const recordClickQuery = gql`
  mutation RecordClick($object: analytics_insert_input!) {
    insert_analytics_one(object: $object) {
      id
    }
  }
`;

const recordLinksClicksQuery = gql`
  mutation LinkPlusOne($_eq: String = "") {
    update_links(where: { key: { _eq: $_eq } }, _inc: { clicks: "1" }) {
      affected_rows
      returning {
        clicks
        id
      }
    }
  }
`;

const recordUserPageClicksQuery = gql`
  mutation UserPagePlusOne($_eq: String = "johnathan") {
    update_users(where: { url_key: { _eq: $_eq } }, _inc: { clicks: "1" }) {
      affected_rows
      returning {
        id
        clicks
      }
    }
  }
`;

export async function recordClick({
  req,
  fullKey,
}: {
  req: NextRequest;
  fullKey: string;
}) {
  const key = decodeURIComponent(fullKey.split("/")[1]);
  const isUserPage = decodeURIComponent(fullKey.split("/")[0]) === "u";
  const geo =
    process.env.node_env === "production" ? req.geo : LOCALHOST_GEO_DATA;
  const ua = userAgent(req);
  const referer = req.headers.get("referer");
  const recordClickVariables = {
    object: {
      user_key: isUserPage ? key : null,
      key: isUserPage ? "_root" : key,
      country: geo?.country || "Unknown",
      city: geo?.city || "Unknown",
      region: geo?.region || "Unknown",
      latitude: geo?.latitude || "Unknown",
      longitude: geo?.longitude || "Unknown",
      ua: ua.ua || "Unknown",
      browser: ua.browser.name || "Unknown",
      browser_version: ua.browser.version || "Unknown",
      engine: ua.engine.name || "Unknown",
      engine_version: ua.engine.version || "Unknown",
      os: ua.os.name || "Unknown",
      os_version: ua.os.version || "Unknown",
      device: ua.device.type ? capitalize(ua.device.type) : "Desktop",
      device_vendor: ua.device.vendor || "Unknown",
      device_model: ua.device.model || "Unknown",
      cpu_architecture: ua.cpu?.architecture || "Unknown",
      bot: ua.isBot,
      referer: referer ? getDomainWithoutWWW(referer) : "(direct)",
      referer_url: referer || "(direct)",
    },
  };

  const mutation = async (query: any, variables: any) => {
    const result = await client.mutation(query, variables, {
      fetchOptions: () => ({
        headers: {
          "x-hasura-admin-secret":
            "7lQAMFpyeVollj1jalVlpTTBQn7m7odbfSP6w29fHqIJY6b0C7g4K0cyFhG9AyYj",
        },
      }),
    });

    return result;
  };

  const result = await Promise.allSettled([
    mutation(recordClickQuery, recordClickVariables).then((res) => res),
    [
      !isUserPage
        ? mutation(recordLinksClicksQuery, { _eq: key }).then((res) => res)
        : mutation(recordUserPageClicksQuery, { _eq: key }).then((res) => res),
    ],
  ]);

  return result;
}
