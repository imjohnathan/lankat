import { auth } from "@/lib/auth";
import { isValidUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import { getMetaTags } from "./metatags";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Please Login first" }, { status: 403 });
  }

  const url = req.nextUrl.searchParams.get("url");
  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const metatags = await getMetaTags(url);
  return new Response(JSON.stringify(metatags), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}) as any;

export const OPTIONS = async (req: Request) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
};
