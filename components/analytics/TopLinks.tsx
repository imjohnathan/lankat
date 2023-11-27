import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetcher, linkConstructor } from "@/lib/utils";
import { Maximize } from "lucide-react";
import { useContext, useState } from "react";
import useSWR from "swr";
import BarList from "./BarList";

export default function TopLinks() {
  const { baseApiPath, queryString, modal } = useContext(StatsContext);

  const { data } = useSWR<{ domain: string; key: string; clicks: number }[]>(
    `${baseApiPath}/top_links?${queryString}`,
    fetcher,
  );

  const { queryParams } = useRouterStuff();
  const [showModal, setShowModal] = useState(false);

  const barList = (limit?: number) => (
    <BarList
      tab="Top Links"
      data={
        data?.map((d) => ({
          title: linkConstructor({
            key: d.key,
            pretty: true,
          }),
          href: queryParams({
            set: {
              key: d.key,
            },
            getNewPath: true,
          }) as string,
          clicks: d.clicks,
        })) || []
      }
      maxClicks={data?.[0]?.clicks || 0}
      barBackground="bg-blue-100"
      setShowModal={setShowModal}
      {...(limit && { limit })}
    />
  );

  return (
    <>
      <ScrollArea className="scrollbar-hide relative z-0 h-[400px] border border-gray-200 bg-white px-7 py-5 sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
        <div className="mb-5 flex">
          <h1 className="text-lg font-semibold">連結點擊排行</h1>
        </div>
        {data ? (
          data.length > 0 ? (
            barList(9)
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-gray-600">No data available</p>
            </div>
          )
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            Loading...
          </div>
        )}
        {!modal && data && data.length > 9 && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-full items-center justify-center space-x-2 rounded-md bg-gradient-to-b from-transparent to-white py-2 text-gray-500 transition-all hover:text-gray-800 active:scale-95"
          >
            <Maximize className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase">View all</p>
          </button>
        )}
      </ScrollArea>
    </>
  );
}
