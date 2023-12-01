"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Links } from "@/gql/graphql";
import {
  GOOGLE_FAVICON_URL,
  dateFormat,
  getApexDomain,
  linkConstructor,
  nFormatter,
} from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import { gql, useMutation, useQuery } from "@urql/next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import IconEdit from "~icons/solar/pen-new-square-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";

interface LinksFilter {
  [key: string]: any;
}

const linksFilter: LinksFilter = {
  short: {
    widgets_links_aggregate: { count: { predicate: { _eq: 0 } } },
  },
  page: {
    widgets_links: {},
  },
  all: {},
};

function Filter({ filter }: { filter: string }) {
  const basePath = "/admin/links?filter=";
  return (
    <RadioGroup>
      <Link
        href={basePath + "all"}
        className="flex cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-all hover:bg-gray-100"
      >
        <RadioGroupItem value="all" checked={filter === "all"} id="r1" />
        <Label className="cursor-pointer" htmlFor="r1">
          全部
        </Label>
      </Link>
      <Link
        href={basePath + "short"}
        className="flex cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-all hover:bg-gray-100"
      >
        <RadioGroupItem value="short" checked={filter === "short"} id="r2" />
        <Label className="cursor-pointer" htmlFor="r2">
          只有短連結
        </Label>
      </Link>
      <Link
        href={basePath + "page"}
        className="flex cursor-pointer items-center space-x-2 rounded-md px-3 py-2 transition-all hover:bg-gray-100"
      >
        <RadioGroupItem value="page" checked={filter === "page"} id="r3" />
        <Label className="cursor-pointer" htmlFor="r3">
          只有名片連結
        </Label>
      </Link>
    </RadioGroup>
  );
}

function DataTable() {
  const { openAddEditLinkModal } = useModalStore();
  const query = gql`
    query GetLinks($where: links_bool_exp) {
      links(order_by: { created_at: desc, id: asc }, where: $where) {
        id
        url
        clicks
        key
        created_at
        og_image
        og_description
        og_title
        parameters
        widgets_links {
          name
        }
      }
    }
  `;

  const deleteMutation = gql`
    mutation deleteLink($id: uuid!) {
      delete_links_by_pk(id: $id) {
        id
      }
    }
  `;

  const searchParams = useSearchParams();
  const searchFilter = searchParams?.get("filter") || "short";
  const variables = linksFilter[searchFilter] || linksFilter["short"];
  const [result] = useQuery({ query, variables: { where: variables } });
  const [deleteLinkResult, deleteLink] = useMutation(deleteMutation);
  const { data, fetching, error } = result;
  const handleDelete = async (id: string) => {
    try {
      await deleteLink({ id });
      toast.success("連結刪除成功");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
      <Card className="scrollbar-hide sticky top-32 col-span-2 hidden max-h-[calc(100vh-150px)] self-start overflow-auto p-5 lg:block">
        <Filter filter={searchFilter} />
      </Card>
      <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5">
        <div className="grid gap-4">
          {!data?.links.length && (
            <div className="grid place-items-center p-6 text-xl font-medium opacity-50">
              目前還沒有連結
            </div>
          )}
          {data?.links.length &&
            data.links.map((link: Links) => {
              const { clicks, created_at, id, key, url, widgets_links } = link;
              const shortUrl = `${process.env.NEXT_PUBLIC_SHORT_URL}/s/${key}`;
              return (
                <Card key={id} className="flex justify-between p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={GOOGLE_FAVICON_URL + getApexDomain(url ?? "")}
                      alt={getApexDomain(url ?? "")}
                      className="h-[40px] w-[40px] rounded-lg object-contain"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <a
                          className="font-medium"
                          href={shortUrl}
                          target="_blank"
                        >
                          {linkConstructor({
                            key: key ?? "",
                            pretty: true,
                          })}
                        </a>
                        <CopyButton className="text-xs" value={shortUrl} />
                      </div>
                      <div className="flex items-center gap-2">
                        {widgets_links && widgets_links.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center">
                                <div className="flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs md:inline-flex">
                                  {widgets_links[0].name}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>這個連結是從社群名片中建立的</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <p className="flex h-full max-w-[250px] items-center truncate text-xs text-gray-400">
                          {url}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex w-full justify-between">
                      <Link
                        href={"/admin/analytics?interval=7d&key=" + key}
                        className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100 md:inline-flex"
                      >
                        <p className="whitespace-nowrap text-sm text-gray-500">
                          成效 {nFormatter(clicks) || 0}
                        </p>
                      </Link>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openAddEditLinkModal({ link })}
                          className="text-slate-400 hover:text-black"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </div>

                    <p className="whitespace-nowrap text-xs text-gray-500">
                      {dateFormat(created_at)}
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default function LinksList() {
  const { openAddEditLinkModal } = useModalStore();
  return (
    <>
      <div className="my-10">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="mb-6 flex justify-end">
            <Button onClick={openAddEditLinkModal}>新增</Button>
          </div>
          <Suspense>
            <DataTable />
          </Suspense>
        </div>
      </div>
    </>
  );
}
