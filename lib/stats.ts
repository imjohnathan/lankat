import { client } from "@/lib/nodeClient";
import { gql } from "@urql/next";

const getUserPageClicksQuery = gql`
  query getUserPageClicks($id: uuid!) {
    users_by_pk(id: $id) {
      clicks
    }
  }
`;
const getLinkClicks = gql`
  query GetLinkClicks($key: String!) {
    links(where: { key: { _eq: $key } }) {
      clicks
    }
  }
`;

const query = async (query: any, variables: any) => {
  const result = await client.query(query, variables);
  return result;
};

export type IntervalProps = "1h" | "24h" | "7d" | "30d" | "90d" | "all";

export const INTERVALS = [
  {
    display: "過去一小時",
    value: "1h",
  },
  {
    display: "過去24小時",
    value: "24h",
  },
  {
    display: "過去7天",
    value: "7d",
  },
  {
    display: "過去30天",
    value: "30d",
  },
  {
    display: "過去3個月",
    value: "90d",
  },
  {
    display: "所有時間",
    value: "all",
  },
];

export const intervalData = {
  "1h": {
    startDate: new Date(Date.now() - 3600000),
    granularity: "minute",
  },
  "24h": {
    startDate: new Date(Date.now() - 86400000),
    granularity: "hour",
  },
  "7d": {
    startDate: new Date(Date.now() - 604800000),
    granularity: "day",
  },
  "30d": {
    startDate: new Date(Date.now() - 2592000000),
    granularity: "day",
  },
  "90d": {
    startDate: new Date(Date.now() - 7776000000),
    granularity: "month",
  },
  all: {
    startDate: new Date("2023-11-24"),
    granularity: "month",
  },
};

export type LocationTabs = "country" | "city" | "region";

export type DeviceTabs = "device" | "browser" | "os" | "ua";

const VALID_TINYBIRD_ENDPOINTS = [
  "timeseries",
  "clicks",
  "top_links",
  "country",
  "city",
  "device",
  "browser",
  "os",
  "referer",
];

export const VALID_STATS_FILTERS = [
  "country",
  "city",
  "device",
  "browser",
  "os",
  "referer",
];

export const getStats = async ({
  domain,
  key,
  endpoint,
  interval,
  ...rest
}: {
  domain: string;
  key?: string;
  endpoint: string;
  interval?: string;
} & {
  [key in (typeof VALID_STATS_FILTERS)[number]]: string;
}) => {
  // Note: we're using decodeURIComponent in this function because that's how we store it in MySQL and Tinybird

  if (
    !client ||
    !process.env.TINY_BIRD_TOKEN ||
    !VALID_TINYBIRD_ENDPOINTS.includes(endpoint)
  ) {
    return [];
  }

  // get all-time clicks count if:
  // 1. endpoint is /clicks
  // 2. interval is not defined
  // 3. there's a connection to MySQL
  if (endpoint === "clicks" && key && !interval && client) {
    const { data: response, error } =
      key === "_root"
        ? await query(getUserPageClicksQuery, { id: domain })
        : await query(getLinkClicks, { key });
    try {
      if (error) throw error;
      const clicks =
        key === "_root"
          ? response.users_by_pk["clicks"]
          : response.links[0]["clicks"];
      return clicks || "0";
    } catch (e) {
      console.log(e, "Potential reason: Link is not in MySQL DB");
    }
  }

  let url = new URL(
    `https://api.us-east.tinybird.co/v0/pipes/${endpoint}.json`,
  );
  url.searchParams.append("domain", domain);
  if (key) {
    url.searchParams.append("key", decodeURIComponent(key));
  }
  if (interval) {
    url.searchParams.append(
      "start",
      intervalData[interval].startDate
        .toISOString()
        .replace("T", " ")
        .replace("Z", ""),
    );
    url.searchParams.append(
      "end",
      new Date(Date.now()).toISOString().replace("T", " ").replace("Z", ""),
    );

    url.searchParams.append("granularity", intervalData[interval].granularity);
  }

  VALID_STATS_FILTERS.forEach((filter) => {
    if (rest[filter]) {
      url.searchParams.append(filter, rest[filter]);
    }
  });
  console.log(url.toString());
  return await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TINY_BIRD_TOKEN}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(({ data }) => {
      if (endpoint === "clicks") {
        try {
          const clicks = data[0]["count()"];
          return clicks || "0";
        } catch (e) {
          console.log(e);
        }
      }
      return data;
    });
};
