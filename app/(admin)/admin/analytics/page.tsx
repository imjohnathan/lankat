'use client';
import Clicks from '@/components/analytics/Clicks';
import Devices from '@/components/analytics/Devices';
import Locations from '@/components/analytics/Locations';
import Referer from '@/components/analytics/Referer';
import Toggle from '@/components/analytics/Toggle';
import TopLinks from '@/components/analytics/TopLinks';
import { VALID_STATS_FILTERS } from '@/lib/stats';
import { fetcher } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { createContext, useMemo } from 'react';
import useSWR from 'swr';

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
  basePath: '',
  baseApiPath: '',
  domain: '',
  key: '',
  queryString: '',
  interval: ''
});

export default function Analytics() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  let { key } = useParams() as {
    key?: string;
  };
  const domainSlug = searchParams?.get('domain') || session?.id;

  key = searchParams?.get('key') || key;
  const interval = searchParams?.get('interval') || '24h';

  const { basePath, domain, baseApiPath } = useMemo(() => {
    return {
      basePath: `/admin/analytics`,
      baseApiPath: `/api/stats`,
      domain: domainSlug
    };
  }, [domainSlug]);

  const queryString = useMemo(() => {
    const availableFilterParams = VALID_STATS_FILTERS.reduce(
      (acc, filter) => ({
        ...acc,
        ...(searchParams?.get(filter) && {
          [filter]: searchParams.get(filter)
        })
      }),
      {}
    );
    return new URLSearchParams({
      ...(domain && { domain }),
      ...(key && { key }),
      ...availableFilterParams,
      ...(interval && { interval })
    }).toString();
  }, [domain, key, searchParams, interval]);

  const { data: totalClicks } = useSWR<number>(`${baseApiPath}/clicks?${queryString}`, fetcher, {
    revalidateOnFocus: false
  });

  return (
    <StatsContext.Provider
      value={{
        basePath,
        baseApiPath,
        queryString,
        domain: domainSlug,
        key: key ? decodeURIComponent(key) : undefined,
        interval,
        totalClicks
      }}
    >
      <div className="overflow-auto min-h-screen bg-gray-50 py-10">
        <div className="container">
          <Toggle />
          <div className="mx-auto grid max-w-4xl gap-5">
            <Clicks />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Locations />
              <TopLinks />
              <Devices />
              <Referer />
            </div>
          </div>
        </div>
      </div>
    </StatsContext.Provider>
  );
}
