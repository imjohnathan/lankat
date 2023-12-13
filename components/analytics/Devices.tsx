import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceTabs } from "@/lib/stats";
import { fetcher } from "@/lib/utils";
import { useContext, useState } from "react";
import useSWR from "swr";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import BarList from "./BarList";

export default function Devices() {
  const [tab, setTab] = useState<DeviceTabs>("device");

  const { baseApiPath, queryString, modal } = useContext(StatsContext);

  const { data } = useSWR<
    ({
      [key in DeviceTabs]: string;
    } & { clicks: number })[]
  >(`${baseApiPath}/${tab}?${queryString}`, fetcher, {
    revalidateOnFocus: false,
  });

  const { queryParams } = useRouterStuff();
  const [showModal, setShowModal] = useState(false);

  const barList = (limit?: number) => (
    <BarList
      tab={tab}
      data={
        data?.map((d) => ({
          title: d[tab],
          href: queryParams({
            set: {
              [tab]: d[tab],
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
      <ScrollArea className="scrollbar-hide relative z-0 h-[400px]   rounded-lg border bg-card px-7 py-5 text-card-foreground shadow-sm">
        <div className="mb-5 flex justify-between">
          <h1 className="text-lg font-semibold">裝置</h1>
          <Tabs value={tab} onValueChange={(tab) => setTab(tab)}>
            <TabsList className="grid h-auto w-full grid-cols-3 p-1 text-xs">
              <TabsTrigger value="device">裝置</TabsTrigger>
              <TabsTrigger value="browser">瀏覽器</TabsTrigger>
              <TabsTrigger value="os">系統</TabsTrigger>
            </TabsList>
          </Tabs>
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
