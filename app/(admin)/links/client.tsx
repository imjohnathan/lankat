"use client";

import AddLinksModal from "@/components/links/AddEditLinksModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import { gql, useMutation, useQuery } from "@urql/next";
import { Suspense, useState } from "react";
import { toast } from "sonner";
function DataTable() {
  const query = gql`
    query GetLinks {
      links {
        id
        clicks
        key
        url
        created_at
        og_image
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

  const [result] = useQuery({ query });
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2100px]">預覽圖</TableHead>
          <TableHead className="w-[100px]">網址</TableHead>
          <TableHead>成效</TableHead>
          <TableHead className="text-right">時間</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.links.length &&
          data.links.map(({ clicks, created_at, id, key, url, og_image }) => {
            const {
              data: { publicUrl },
            } = supabase.storage
              .from(process.env.NEXT_PUBLIC_SUPABASE_LINKS_BUCKET as string)
              .getPublicUrl(og_image);
            return (
              <TableRow key={id}>
                <TableCell>
                  <img
                    src={
                      og_image ||
                      "data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="
                    }
                    alt={"OG image"}
                    className="h-[100px] w-[100px] rounded-lg border object-cover"
                  />
                </TableCell>
                <TableCell>
                  <p className="max-w-sm truncate">{url}</p>
                  <p>https://lank.at/s/{key}</p>
                </TableCell>
                <TableCell>{clicks || 0}</TableCell>
                <TableCell className="text-right">
                  {dateFormat(created_at)}
                </TableCell>
                <TableCell className="grid h-full w-full place-items-center gap-1">
                  <div className="flex gap-1">
                    <Button size={"sm"}>編輯</Button>
                    <Button
                      size={"sm"}
                      onClick={() => handleDelete(id)}
                      variant="destructive"
                    >
                      刪除
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default function Links() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mt-10 p-6">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setOpen(!open)}>新增</Button>
        </div>
        <Card>
          <Suspense>
            <DataTable />
          </Suspense>
        </Card>
      </div>
      <AddLinksModal open={open} setOpen={setOpen} />
    </>
  );
}
