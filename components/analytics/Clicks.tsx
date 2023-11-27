import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import useRouterStuff from "@/components/ui/hooks/useRouterStuff";
import { INTERVALS, VALID_STATS_FILTERS } from "@/lib/stats";
import {
  COUNTRIES,
  capitalize,
  linkConstructor,
  nFormatter,
} from "@/lib/utils";
import { X } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useMemo } from "react";
import Chart from "~icons/solar/chart-2-bold";
import BarChart from "./BarChart";

export default function Clicks() {
  const { totalClicks, domain, key, interval } = useContext(StatsContext);
  const { slug } = useParams() as { slug?: string };
  const searchParams = useSearchParams();
  //   const domain = searchParams?.get("domain");
  //   const key = searchParams?.get("key");
  const { queryParams } = useRouterStuff();
  const selectedInterval = useMemo(() => {
    return INTERVALS.find((s) => s.value === interval) || INTERVALS[1];
  }, [interval]);

  return (
    <div className="max-w-4xl border border-gray-200 bg-white p-5 sm:rounded-lg sm:border-gray-100 sm:p-10 sm:shadow-lg">
      <div className="mb-5 flex items-start justify-between space-x-4">
        <div className="flex-none">
          <div className="flex items-end space-x-1">
            {totalClicks || totalClicks === 0 ? (
              <h1 className="text-3xl font-bold sm:text-4xl">
                {nFormatter(totalClicks)}
              </h1>
            ) : (
              <div className="h-10 w-12 animate-pulse rounded-md bg-gray-200" />
            )}
            <Chart className="mb-1 h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium uppercase text-gray-600">
            {selectedInterval.display}總點擊數
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {domain &&
            (key ? (
              <button
                onClick={() => {
                  queryParams({
                    del: ["domain", "key"],
                  });
                }}
                className="flex items-center space-x-1 rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-500 transition-all duration-75 hover:bg-gray-100 active:scale-[0.98] sm:px-3"
              >
                <p>短連結</p>
                <strong className="text-gray-800">
                  {linkConstructor({ key, pretty: true })}
                </strong>
                <X className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex items-center space-x-1 rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-500 transition-all duration-75 hover:bg-gray-100 sm:px-3">
                <strong className="text-gray-800">我的頁面統計</strong>
              </div>
            ))}
          {VALID_STATS_FILTERS.map((filter) => {
            const value = searchParams?.get(filter);
            if (!value) return null;
            return (
              <button
                onClick={() => {
                  queryParams({
                    del: filter,
                  });
                }}
                className="flex items-center space-x-1 rounded-md bg-gray-50 px-2 py-1 text-sm text-gray-500 transition-all duration-75 hover:bg-gray-100 active:scale-[0.98] sm:px-3"
              >
                <p>{capitalize(filter)}</p>
                <strong className="text-gray-800">
                  {filter === "country" ? COUNTRIES[value] : value}
                </strong>
                <X className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>
      <BarChart />
    </div>
  );
}
