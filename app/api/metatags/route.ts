import { auth } from "@/lib/auth";
import { isValidUrl } from "@/lib/utils";
import { NextFetchEvent } from "next/server";
import { parse } from "node-html-parser";

export const GET = auth(async (req: any, ev: NextFetchEvent) => {
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

  const metatags = await getMetaTags(url, ev);
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

// export default async function handler(req: NextRequest, ev: NextFetchEvent) {
//   if (req.method === "GET") {
//     const url = req.nextUrl.searchParams.get("url");
//     if (!url || !isValidUrl(url)) {
//       return new Response("Invalid URL", { status: 400 });
//     }

//     // Rate limit if user is not logged in
//     const session = await auth();
//     if (!session) {
//       return new Response("Don't DDoS me pls 🥺", { status: 429 });
//     }

//     const metatags = await getMetaTags(url, ev);
//     return new Response(JSON.stringify(metatags), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//     });
//   } else if (req.method === "OPTIONS") {
//     return new Response(null, {
//       status: 204,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, OPTIONS",
//       },
//     });
//   } else {
//     return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
//   }
// }

const getHtml = async (url: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "dub-bot/1.0",
      },
    });
    clearTimeout(timeoutId);
    return await response.text();
  } catch (error) {
    if (error.name === "AbortError") {
      // Handle fetch request abort (e.g., due to timeout)
      console.error("Fetch request aborted due to timeout.");
    } else {
      // Handle other fetch errors
      console.error("Fetch request failed:", error);
    }
    return null;
  }
};

const getHeadChildNodes = (html) => {
  const ast = parse(html); // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll("meta").map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href;
    return {
      property,
      content: attributes.content,
    };
  });
  const title = ast.querySelector("title")?.innerText;
  const linkTags = ast.querySelectorAll("link").map(({ attributes }) => {
    const { rel, href } = attributes;
    return {
      rel,
      href,
    };
  });

  return { metaTags, title, linkTags };
};

const getRelativeUrl = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null;
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl;
  }
  const { protocol, host } = new URL(url);
  const baseURL = `${protocol}//${host}`;
  return new URL(imageUrl, baseURL).toString();
};

export const getMetaTags = async (url: string, ev?: NextFetchEvent) => {
  const html = await getHtml(url);
  if (!html) {
    return {
      title: url,
      description: "No description",
      image: null,
    };
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html);

  let object = {};

  for (let k in metaTags) {
    let { property, content } = metaTags[k];

    property && (object[property] = content);
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m];

    rel && (object[rel] = href);
  }

  const title = object["og:title"] || object["twitter:title"] || titleTag;

  const description =
    object["description"] ||
    object["og:description"] ||
    object["twitter:description"];

  const image =
    object["og:image"] ||
    object["twitter:image"] ||
    object["image_src"] ||
    object["icon"] ||
    object["shortcut icon"];

  return {
    title: title || url,
    description: description || "No description",
    image: getRelativeUrl(url, image),
  };
};
