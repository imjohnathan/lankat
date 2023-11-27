import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationTabs } from "@/lib/stats";
import { COUNTRIES, fetcher } from "@/lib/utils";
import { useContext, useState } from "react";
import useSWR from "swr";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import BarList from "./BarList";

export default function Locations() {
  const [tab, setTab] = useState<LocationTabs>("country");

  const { baseApiPath, queryString, modal } = useContext(StatsContext);

  const { data } = useSWR<{ country: string; city: string; clicks: number }[]>(
    `${baseApiPath}/${tab}?${queryString}`,
    fetcher,
  );

  const { queryParams } = useRouterStuff();
  const [showModal, setShowModal] = useState(false);

  const barList = (limit?: number) => (
    <BarList
      tab={tab}
      data={
        data?.map((d) => ({
          icon: (
            <img
              alt={d.country}
              src={`https://flag.vercel.app/m/${d.country}.svg`}
              className="h-3 w-5 rounded-[2px]"
            />
          ),
          title: tab === "country" ? COUNTRIES[d.country] : d.city,
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
      <ScrollArea className="scrollbar-hide relative z-0 h-[400px] border border-gray-200 bg-white px-7 py-5  sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
        <div className="mb-5 flex justify-between">
          <h1 className="text-lg font-semibold">地區</h1>
          <Tabs value={tab} onValueChange={(tab) => setTab(tab)}>
            <TabsList className="grid h-auto w-full grid-cols-2 p-1 text-xs">
              <TabsTrigger value="country">國家</TabsTrigger>
              <TabsTrigger value="city">城市</TabsTrigger>
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
