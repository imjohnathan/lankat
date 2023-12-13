import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GOOGLE_FAVICON_URL, fetcher } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { useContext, useState } from "react";
import useSWR from "swr";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import BarList from "./BarList";

export default function Referer() {
  const { baseApiPath, queryString, totalClicks, modal } =
    useContext(StatsContext);

  const { data } = useSWR<{ referer: string; clicks: number }[]>(
    `${baseApiPath}/referer?${queryString}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const { queryParams } = useRouterStuff();
  const [showModal, setShowModal] = useState(false);

  const barList = (limit?: number) => (
    <BarList
      tab="Referrer"
      data={
        data?.map((d) => ({
          icon:
            d.referer === "(direct)" ? (
              <Link2 className="h-4 w-4" />
            ) : (
              <img
                src={`${GOOGLE_FAVICON_URL}${d.referer}`}
                alt={d.referer}
                width={20}
                height={20}
                className="h-4 w-4 rounded-full"
              />
            ),
          title: d.referer,
          href: queryParams({
            set: {
              referer: d.referer,
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
          <h1 className="text-lg font-semibold">參照網址</h1>
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
