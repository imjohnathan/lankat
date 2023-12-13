import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { cn, getApexDomain, linkConstructor } from "@/lib/utils";
import { gql, useQuery } from "@urql/next";
import punycode from "punycode";

const getLinkNameByKey = gql`
  query getLinkNameByKey($key: String_comparison_exp = { _eq: "TuQchTF" }) {
    links(where: { key: $key }) {
      clicks
      widgets_links {
        name
      }
      image
      created_at
      url
    }
  }
`;

export default function LinkPreviewTooltip({
  link,
}: {
  // link is in the format dub.sh/github
  link: string;
}) {
  const domain = link.split("/")[0];
  const key = link.split("/").slice(1).join("/").split("/")[1];
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getLinkNameByKey,
    variables: { key: { _eq: key } },
  });
  if (fetching) {
    return (
      <div className="relative flex w-[28rem] items-center px-4 py-2">
        <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-200 sm:h-10 sm:w-10" />
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
            <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }
  if (data.links.length === 0) {
    return (
      <div className="relative flex w-[28rem] items-center space-x-3 px-4 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 px-0 sm:h-10 sm:w-10">
          {/* <Trash className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" /> */}
        </div>
        <div className="flex flex-col space-y-1">
          <p className="w-full max-w-[140px] truncate text-sm font-semibold text-gray-500 line-through sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]">
            {linkConstructor({
              domain: punycode.toUnicode(domain || ""),
              key,
              pretty: true,
            })}
          </p>
          <p className="text-sm text-gray-500">This link has been deleted.</p>
        </div>
      </div>
    );
  }

  const { widgets_links, image, created_at, url, og_image } = data.links[0];
  const apexDomain = getApexDomain(url);
  return (
    <div className="relative flex w-[28rem] items-center justify-between px-4 py-2">
      <div className="relative flex shrink items-center">
        {Boolean(image || og_image) && (
          <Avatar>
            <AvatarImage src={image || og_image} alt="Link Image" />
          </Avatar>
        )}
        {/* 
              Here, we're manually setting ml-* values because if we do space-x-* in the parent div, 
              it messes up the tooltip positioning.
            */}
        <div className="ml-2 sm:ml-4">
          <div className="flex max-w-fit items-center space-x-2">
            <a
              className={cn(
                "w-full max-w-[140px] truncate text-sm font-semibold text-blue-800 sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]",
              )}
              href={linkConstructor({ domain, key })}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {linkConstructor({
                domain: punycode.toUnicode(domain || ""),
                key,
                pretty: true,
              })}
            </a>
            <CopyButton value={linkConstructor({ domain, key })} />
          </div>
          <div className="flex max-w-fit items-center space-x-1">
            {widgets_links.length !== 0 && <p>{widgets_links[0].name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
