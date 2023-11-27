import { recordClick } from "@/lib/analytics";
import { client } from "@/lib/nodeClient";
import { parse } from "@/lib/utils";
import { gql } from "@urql/next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const query = gql`
  query getUserId($_eq: String!) @cached {
    users(where: { url_key: { _eq: $_eq } }, limit: 1) {
      id
    }
  }
`;

export default async function UserMiddleware(
  req: NextRequest,
  ev: NextFetchEvent,
) {
  const { fullKey } = parse(req);
  const key = decodeURIComponent(fullKey.split("/")[1]);
  const { data, error } = await client.query(query, { _eq: key });
  console.log(data, error);
  if (data.users[0]?.id) {
    const userId = data.users[0]?.id;
    ev.waitUntil(recordClick({ req, fullKey, userId }));
  }
  return NextResponse.next();
}
