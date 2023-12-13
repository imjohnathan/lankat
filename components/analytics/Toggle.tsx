import { StatsContext } from "@/app/(admin)/admin/analytics/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INTERVALS } from "@/lib/stats";
import { linkConstructor } from "@/lib/utils";
import { Calendar, Check, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";

export default function Toggle() {
  const { basePath, domain, key, interval } = useContext(StatsContext);
  const [openDatePopover, setOpenDatePopover] = useState(false);
  const selectedInterval = useMemo(() => {
    return INTERVALS.find((s) => s.value === interval) || INTERVALS[1];
  }, [interval]);
  const { data: session } = useSession();
  return (
    <div className={"z-10 mb-5 bg-gray-50 py-3 md:py-5"}>
      <div className="mx-auto flex h-20 max-w-4xl flex-col items-center justify-between space-y-3 px-2.5 md:h-10 md:flex-row md:space-y-0 lg:px-0">
        {domain && !key ? (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                alt={session?.user?.display_name}
                width={48}
                height={48}
                src={session?.user.image ?? ""}
              />
              <AvatarFallback>
                {session?.user?.display_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-gray-800">我的頁面</h2>
          </div>
        ) : domain && key ? (
          <a
            className="group flex text-lg font-semibold text-gray-800 md:text-xl"
            href={linkConstructor({ key })}
            target="_blank"
            rel="noreferrer"
          >
            {linkConstructor({
              key,
              pretty: true,
            })}
          </a>
        ) : null}
        <div className="flex items-center">
          <Popover open={openDatePopover} onOpenChange={setOpenDatePopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-[200px] justify-between"
              >
                <Calendar className="h-4 w-4" />
                {selectedInterval.display}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup className="grid gap-2 p-2">
                  {INTERVALS.map(({ display, value }) => {
                    return (
                      <Link
                        key={value}
                        href={`${basePath}?${new URLSearchParams({
                          ...(key && key !== "_root" && { key }),
                          interval: value,
                        }).toString()}`}
                        scroll={false}
                        className="relative flex w-full cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 outline-none hover:bg-gray-100 active:bg-gray-200"
                      >
                        <p className="text-sm">{display}</p>
                        {selectedInterval.value === value && (
                          <Check className="h-4 w-4" aria-hidden="true" />
                        )}
                      </Link>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
