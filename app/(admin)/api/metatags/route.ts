import { auth } from "@/lib/auth";
import { isValidUrl } from "@/lib/utils";
import { getMetaTags } from "./metatags";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return new Response(
      JSON.stringify({ errors: { message: "Please Login", code: 429 } }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  const url = req.nextUrl.searchParams.get("url");
  if (!url || !isValidUrl(url)) {
    return new Response(
      JSON.stringify({ errors: { message: "Invalid URL", code: 400 } }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
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
