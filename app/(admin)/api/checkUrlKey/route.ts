import { auth } from "@/lib/auth";
import { client } from "@/lib/nodeClient";
import { getSearchParams } from "@/lib/utils";
import { gql } from "@urql/next";
import { NextResponse } from "next/server";

const query = gql`
  query CountUrlKeys($key: String!) {
    users_aggregate(where: { url_key: { _eq: $key } }) {
      aggregate {
        count
      }
    }
  }
`;

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Please Login first" }, { status: 403 });
  }

  const searchParams = getSearchParams(req.url);

  const { key } = searchParams;
  const { data, error } = await client.query(
    query,
    {
      key,
    },
    {
      requestPolicy: "network-only",
    },
  );

  if (data?.users_aggregate?.aggregate.count > 0) {
    return NextResponse.json({ unique: false }, { status: 200 });
  }
  return NextResponse.json({ unique: true }, { status: 200 });
});
