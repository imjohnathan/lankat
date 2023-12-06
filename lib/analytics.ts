import { client } from "@/lib/nodeClient";
import {
  LOCALHOST_GEO_DATA,
  capitalize,
  getDomainWithoutWWW,
} from "@/lib/utils";
import { gql } from "@urql/next";
import { NextRequest, userAgent } from "next/server";

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
  userId,
}: {
  req: NextRequest;
  fullKey: string;
  userId: string;
}) {
  const key = decodeURIComponent(fullKey.split("/")[1]);
  const isUserPage = decodeURIComponent(fullKey.split("/")[0]) === "u";
  const geo =
    process.env.node_env === "production" ? req.geo : LOCALHOST_GEO_DATA;
  console.log(geo, req.geo);
  const ua = userAgent(req);
  const referer = req.headers.get("referer");
  const recordClickVariables = {
    timestamp: new Date(Date.now()).toISOString(),
    domain: userId,
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
  };

  const mutation = async (query: any, variables: any) => {
    const result = await client.mutation(query, variables);
    return result;
  };

  const tinyBird = async () => {
    const data = await fetch(
      "https://api.us-east.tinybird.co/v0/events?name=click_events&wait=true",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TINY_BIRD_TOKEN}`,
        },
        body: JSON.stringify(recordClickVariables),
      },
    ).then((res) => res.json());
    return data;
  };

  const result = await Promise.allSettled([
    tinyBird(),
    [
      !isUserPage
        ? mutation(recordLinksClicksQuery, { _eq: key }).then((res) => res)
        : mutation(recordUserPageClicksQuery, { _eq: key }).then((res) => res),
    ],
  ]);

  return result;
}
