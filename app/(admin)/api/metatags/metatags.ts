import { isValidUrl } from "@/lib/utils";
import { parse } from "node-html-parser";

type MetaTag = {
  property?: string;
  content?: string;
};

type LinkTag = {
  rel?: string;
  href?: string;
};

type MetaTagsResult = {
  title: string | null;
  description: string | null;
  image: string | null;
};

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
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        // Handle fetch request abort (e.g., due to timeout)
        console.error("Fetch request aborted due to timeout.");
      } else {
        // Handle other fetch errors
        console.error("Fetch request failed:", error);
      }
    } else {
      console.error("An unknown error occurred");
    }
    return null;
  }
};

const getHeadChildNodes = (html: string) => {
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

export const getMetaTags = async (url: string): Promise<MetaTagsResult> => {
  const html = await getHtml(url);
  if (!html) {
    return {
      title: url,
      description: "No description",
      image: null,
    };
  }

  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html); // 确保 getHeadChildNodes 返回正确的类型

  let object: Record<string, string> = {};

  for (let k in metaTags) {
    let { property, content } = metaTags[k];
    if (property && content) {
      object[property] = content;
    }
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m];
    if (rel && href) {
      object[rel] = href;
    }
  }

  const title =
    object["og:title"] || object["twitter:title"] || titleTag || url;
  const description =
    object["description"] ||
    object["og:description"] ||
    object["twitter:description"] ||
    "No description";
  const image = getRelativeUrl(
    url,
    object["og:image"] ||
      object["twitter:image"] ||
      object["image_src"] ||
      object["icon"] ||
      object["shortcut icon"] ||
      "",
  );

  return { title, description, image };
};
