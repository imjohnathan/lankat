import { client } from "@/lib/nodeClient";
import {
  GOOGLE_FAVICON_URL,
  constructMetadata,
  getApexDomain,
} from "@/lib/utils";
import { gql } from "@urql/next";
import { unescape } from "html-escaper";
import { notFound } from "next/navigation";

const query = gql`
  query GetLinkOG($key: String!) @cached {
    links(where: { key: { _eq: $key } }, limit: 1) {
      og_description
      og_image
      og_title
      url
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: { domain: string; key: string };
}) {
  const key = decodeURIComponent(params.key); // key can potentially be encoded

  const { data: res } = await client.query(query, { key });
  const data = res.links[0];
  if (!data) {
    return;
  }

  const apexDomain = getApexDomain(data.url);

  return constructMetadata({
    title: unescape(data.og_title),
    description: unescape(data.og_description),
    image: unescape(data.og_image),
    icons: `${GOOGLE_FAVICON_URL}${unescape(apexDomain)}`,
    noIndex: true,
  });
}

export default async function ProxyPage({
  params,
}: {
  params: { key: string };
}) {
  const key = decodeURIComponent(params.key);

  const { data: res } = await client.query(query, { key });
  const data = res.links[0];
  // if the link doesn't exist
  if (!data) {
    notFound();
  }

  const apexDomain = getApexDomain(data.url);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="mx-5 w-full max-w-lg overflow-hidden rounded-lg border border-gray-200 sm:mx-0">
        <img
          src={unescape(data.og_image)}
          alt={unescape(data.og_title)}
          className="w-full object-cover"
        />
        <div className="flex space-x-3 bg-gray-100 p-5">
          <img
            src={`${GOOGLE_FAVICON_URL}${unescape(apexDomain)}`}
            alt={unescape(data.og_title)}
            className="mt-1 h-6 w-6"
          />
          <div className="flex flex-col space-y-3">
            <h1 className="font-bold text-gray-700">
              {unescape(data.og_title)}
            </h1>
            <p className="text-sm text-gray-500">
              {unescape(data.og_description)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
