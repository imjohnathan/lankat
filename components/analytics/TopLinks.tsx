import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetcher, linkConstructor } from "@/lib/utils";
import { useContext, useState } from "react";
import useSWR from "swr";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import BarList from "./BarList";

export default function TopLinks() {
  const { baseApiPath, queryString, modal } = useContext(StatsContext);

  const { data } = useSWR<{ domain: string; key: string; clicks: number }[]>(
    `${baseApiPath}/top_links?${queryString}`,
    fetcher,
    { revalidateOnFocus: false },
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
      barBackground="bg-gray-100"
      setShowModal={setShowModal}
      {...(limit && { limit })}
    />
  );

  return (
    <>
      <ScrollArea className="scrollbar-hide relative z-0 h-[400px] rounded-lg border bg-card px-7 py-5 text-card-foreground shadow-sm">
        <div className="mb-5 flex">
          <h1 className="text-lg font-semibold">連結點擊排行</h1>
        </div>
        {data ? (
          data.length > 0 ? (
            barList(9)
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-gray-600">沒有任何資料</p>
            </div>
          )
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <IconLoading className="h-6 w-6" />
          </div>
        )}
      </ScrollArea>
    </>
  );
}
