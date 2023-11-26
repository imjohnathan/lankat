import { recordClick } from "@/lib/analytics";
import { client } from "@/lib/nodeClient";
import { addParamsToURL, detectBot, getFinalUrl, parse } from "@/lib/utils";
import { gql } from "@urql/next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const query = gql`
  query getLink($_eq: String!) @cached {
    links(where: { key: { _eq: $_eq } }, limit: 1) {
      key
      og_description
      og_image
      og_title
      parameters
      url
      user
    }
  }
`;

export default async function LinkMiddleware(
  req: NextRequest,
  ev: NextFetchEvent,
) {
  const { domain, fullKey } = parse(req);
  const isLogger =
    req.method === "POST" && req.nextUrl.searchParams.has("logger");
  const key = decodeURIComponent(fullKey.split("/")[1]);
  if (!domain || !key) {
    return NextResponse.next();
  }

  const { data, error } = await client.query(query, { _eq: key });
  if (error || !data.links.length) {
    if (isLogger)
      return NextResponse.json({ error: "invalid url" }, { status: 400 });
    return NextResponse.redirect(new URL("/", req.url));
  }

  const {
    key: urlKey,
    og_description,
    og_image,
    og_title,
    parameters,
    url,
    user: userId,
  } = data.links[0] || {};
  const proxy = og_description || og_image || og_title;
  const isBot = detectBot(req);

  //統計
  ev.waitUntil(recordClick({ req, fullKey, userId }));

  if (isBot && proxy) {
    return NextResponse.rewrite(
      new URL(`/proxy/${domain}/${encodeURIComponent(key)}`, req.url),
    );
  } else {
    try {
      new URL(url); //test url is valid
      const target = addParamsToURL(url, parameters || {});
      if (isLogger) {
        return NextResponse.json({
          success: true,
          url: getFinalUrl(target, { req }),
        });
      }
      return NextResponse.json({
        url: getFinalUrl(target, { req }),
      });
      //return NextResponse.redirect(getFinalUrl(target, { req }));}
    } catch (e: any) {
      return NextResponse.json({
        error: "invalid url",
        url,
        message: e?.message,
      });
      //return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
