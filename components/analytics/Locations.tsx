import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationTabs } from "@/lib/stats";
import { COUNTRIES, fetcher } from "@/lib/utils";
import { Maximize } from "lucide-react";
import { useContext, useState } from "react";
import useSWR from "swr";
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
              className="h-3 w-5"
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
      barBackground="bg-orange-100"
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
            Loading...
          </div>
        )}
        {!modal && data && data.length > 9 && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-full items-center justify-center space-x-2 rounded-md bg-gradient-to-b from-transparent to-white py-2 text-gray-500 transition-all hover:text-gray-800 active:scale-95"
          >
            <Maximize className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase">看全部</p>
          </button>
        )}
      </ScrollArea>
    </>
  );
}
