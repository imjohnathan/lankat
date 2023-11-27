"use client";
import Clicks from "@/components/analytics/Clicks";
import Toggle from "@/components/analytics/Toggle";
import TopLinks from "@/components/analytics/TopLinks";
import { VALID_STATS_FILTERS } from "@/lib/stats";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { createContext, useMemo } from "react";
import useSWR from "swr";

export const StatsContext = createContext<{
  basePath: string;
  baseApiPath: string;
  domain?: string;
  key?: string;
  queryString: string;
  interval: string;
  totalClicks?: number;
  modal?: boolean;
}>({
  basePath: "",
  baseApiPath: "",
  domain: "",
  key: "",
  queryString: "",
  interval: "",
});

export default function Analytics() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let { slug, key } = useParams() as {
    slug?: string;
    key?: string;
  };
  const domainSlug = searchParams?.get("domain") || session?.id;

  // key can be a path param (public stats pages) or a query param (stats pages in app)
  key = searchParams?.get("key") || key;
  const interval = searchParams?.get("interval") || "24h";

  const { basePath, domain, baseApiPath } = useMemo(() => {
    return {
      basePath: `/admin/analytics`,
      baseApiPath: `/api/stats`,
      domain: domainSlug,
    };
  }, [slug, pathname, , domainSlug, key]);

  const queryString = useMemo(() => {
    const availableFilterParams = VALID_STATS_FILTERS.reduce(
      (acc, filter) => ({
        ...acc,
        ...(searchParams?.get(filter) && {
          [filter]: searchParams.get(filter),
        }),
      }),
      {},
    );
    return new URLSearchParams({
      ...(domain && { domain }),
      ...(key && { key }),
      ...availableFilterParams,
      ...(interval && { interval }),
    }).toString();
  }, [slug, domain, key, searchParams, interval]);

  const { data: totalClicks } = useSWR<number>(
    `${baseApiPath}/clicks?${queryString}`,
    fetcher,
  );

  return (
    <StatsContext.Provider
      value={{
        basePath, // basePath for the page (e.g. /stats/[key], /links/[key], /[slug]/[domain]/[key])
        baseApiPath, // baseApiPath for the API (e.g. /api/edge/links/[key]/stats)
        queryString,
        domain: domainSlug, // domain for the link (e.g. dub.sh, stey.me, etc.)
        key: key ? decodeURIComponent(key) : undefined, // link key (e.g. github, weathergpt, etc.)
        interval, // time interval (e.g. 24h, 7d, 30d, etc.)
        totalClicks, // total clicks for the link
      }}
    >
      <div className="min-h-screen bg-gray-50 py-10">
        <Toggle />
        <div className="mx-auto grid max-w-4xl gap-5">
          <Clicks />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TopLinks />
          </div>
        </div>
      </div>
    </StatsContext.Provider>
  );
}
