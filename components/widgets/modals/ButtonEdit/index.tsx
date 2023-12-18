import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { classes } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PreviewItem } from "@/components/widgets/preview/Buttons";
import type { Links, Widgets } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { gql, useMutation } from "@urql/next";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  UseFormReturn,
  useFieldArray,
  useForm,
  useFormState,
} from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import SolarArrowDownOutline from "~icons/solar/arrow-down-outline";
import SolarArrowUpOutline from "~icons/solar/arrow-up-outline";
import IconCopy from "~icons/solar/copy-outline";
import SolarCursorBold from "~icons/solar/cursor-bold";
import IconEyeHide from "~icons/solar/eye-line-duotone";
import IconEye from "~icons/solar/eye-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";

const upsertWidgetLinksQuery = gql`
  mutation upsertWidget(
    $object: widgets_insert_input = {
      id: "17daee77-4830-437b-9a78-8dcd730b53bd"
      isShow: true
      name: "好看的小工具"
      user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447"
      widgets_links: {
        data: [
          {
            id: 11 #更新需要
            #link_id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #將Link關聯時需要
            name: "按鈕名稱6"
            link: {
              data: {
                id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #更新需要
                key: "gdfgdg" #新增需要
                user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447" #新增需要
                url: "https://tyutyutyut" #新增更新都需要
              }
              on_conflict: {
                constraint: links_pkey
                update_columns: [url, image]
              }
            }
          }
        ]
        on_conflict: {
          constraint: widgets_links_pkey
          update_columns: [name, link_id, isShow, config]
        }
      }
    }
    $deleteIds: widgets_links_bool_exp = { id: { _in: [] } }
  ) {
    insert_widgets_one(
      object: $object
      on_conflict: {
        constraint: widgets_pkey
        update_columns: [isShow, name, config]
      }
    ) {
      id
    }
    delete_widgets_links(where: $deleteIds) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const defaultData = {
  links: [
    {
      name: "",
      url: "",
      isShow: true,
      image: "",
    },
  ],
};

export const FormSchema = z.object({
  links: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().max(100),
      url: z.string().url(),
      isShow: z.boolean(),
      link_id: z.string().optional(),
      clicks: z.number().optional(),
      key: z.string().optional(),
      image: z.string().optional(),
    }),
  ),
});

export function Preview({ fields }: { fields: Partial<Links>[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[480px] grid-cols-1 gap-4">
      {fields.map(({ name, url, isShow }, index) => (
        <PreviewItem
          key={index}
          name={name ?? ""}
          url={url ?? ""}
          isShow={isShow ?? true}
          isPreview
        />
      ))}
    </div>
  );
}

export default function Banner({ widget }: { widget: Widgets }) {
  const { close, setUnSavedChanges } = useModalStore();
  const removeIds = useRef<number[]>([]);
  const formId = useId();
  console.log(widget);
  const dataFromWidget: z.infer<typeof FormSchema> = {
    links:
      widget.widgets_links.length === 0
        ? defaultData.links
        : widget.widgets_links.map((link) => ({
            ...(link.id && { id: link.id }),
            ...(link.link?.id && { link_id: link.link?.id }),
            name: link.name || "",
            url: link?.link?.url || "",
            isShow: link.isShow ?? true,
            key: link.link?.key || "",
            image: link.link?.image || "",
            clicks: link.link?.clicks || 0,
          })),
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultData,
      ...dataFromWidget,
    },
  });
  const { isDirty } = useFormState({
    control: form.control,
  });

  const [{ fetching }, upsertWidgetLinks] = useMutation(upsertWidgetLinksQuery);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFetching = fetching || isSubmitting;

  function extractBlobId(blobUrl: string): string {
    const url = new URL(blobUrl);
    const parts = url.pathname.split("/");
    const blobId = parts[parts.length - 1];
    return blobId;
  }

  async function convertLinksToBlobs(data: any) {
    const promises = data.map(async (link: any) => {
      const [blobUrl, type] = link.image.split("#");
      const response = await fetch(blobUrl);
      const blobData = await response.blob();
      const extension = type.split("/")[1];
      const blobId = extractBlobId(blobUrl);
      return {
        name: `${uuidv4()}.${extension}`,
        type,
        meta: {
          blobId,
        },
        data: blobData,
      };
    });

    return await Promise.all(promises);
  }

  async function uploadFiles(data: z.infer<typeof FormSchema>) {
    try {
      const bucketName = "links";
      const folderName = "banners";
      const supabaseUploadURL = `https://akbggkpvgcoobuczoagm.supabase.co/storage/v1/upload/resumable`;
      const publicUrl = `https://akbggkpvgcoobuczoagm.supabase.co/storage/v1/object/public/${bucketName}`;
      const uppy = new Uppy({
        debug: true,
        restrictions: {
          maxFileSize: 5242880,
          allowedFileTypes: ["image/*"],
        },
      }).use(Tus, {
        endpoint: supabaseUploadURL,
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        chunkSize: 6 * 1024 * 1024,
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
      });
      const filteredBlobs = data.links.filter((link) =>
        link.image.startsWith("blob:"),
      );
      const filesList = await convertLinksToBlobs(filteredBlobs);
      uppy.on("file-added", (file) => {
        console.log("Added file", file);
        file.meta = {
          ...file.meta,
          bucketName: bucketName,
          objectName: folderName ? `${folderName}/${file.name}` : file.name,
          contentType: file.type,
        };
      });

      uppy.addFiles(filesList);

      const res = await uppy.upload();
      const { successful = [], failed = [] } = res;
      console.log(res);
      if (failed.length) throw new Error("上傳失敗");

      const filesUrl = successful.map(({ meta: { objectName, blobId } }) => {
        return { blobId, url: `${publicUrl}/${objectName}` };
      });
      console.log(filesUrl);
      return filesUrl;
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);

      const filesUrl = await uploadFiles(data);

      const variablesLinks = data.links.map((field, index) => {
        const findFile = filesUrl.find(({ blobId }) =>
          field.image.includes(blobId as string),
        );
        const fieldData = {
          name: field.name,
          sort: index,
          //更新時把link_id加入，only for關聯已存在的連結
          ...(!field.id && field.link_id && { link_id: field.link_id }),
          //更新時把widgets_links id, isShow 加入
          ...(field.id && { id: field.id, isShow: field.isShow }),
          link: {
            data: {
              url: field.url,
              //更新時才把link_id帶入
              ...(field.link_id && { id: field.link_id }),
              //新增時才帶入key和user
              ...(!field.id && { key: nanoid(7) }),
              //把img帶入
              image: findFile ? findFile.url : field.image,
              //   ...(field.image &&
              //     field.image.startsWith("blob:") && { image: findFile?.url }),
            },
            on_conflict: {
              constraint: "links_pkey",
              update_columns: ["url", "image"],
            },
          },
        };

        return fieldData;
      });
      console.log(variablesLinks);

      const variables = {
        object: {
          id: widget.id,
          isShow: widget.isShow,
          name: widget.name,
          widgets_links: {
            data: variablesLinks,
            on_conflict: {
              constraint: "widgets_links_pkey",
              update_columns: ["name", "link_id", "isShow", "sort"],
            },
          },
        },
        deleteIds: { id: { _in: removeIds.current } },
      };
      const { error } = await upsertWidgetLinks(variables);
      if (error) throw new Error(error.message);
      toast.success("儲存成功！");
      close();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isDirty) setUnSavedChanges(true);
  }, [isDirty]);

  useEffect(() => {
    form.setFocus("links.0.name");
  }, []);

  const values = form.watch();
  console.log("form errors", form.formState.errors);
  return (
    <>
      <DialogHeader>
        <DialogTitle>連結按鈕</DialogTitle>
      </DialogHeader>
      <div className="flex">
        <ScrollArea className="min-h-48 max-h-[500px] flex-1 px-4">
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-3 pb-4"
            >
              <ImagesForm form={form} removeIds={removeIds} />
              {/* <code className="block whitespace-pre-wrap">
                {JSON.stringify(values, null, 2)}
              </code> */}
            </form>
          </Form>
        </ScrollArea>
        <div className="grid max-w-[480px] flex-1 place-items-center p-4">
          <Preview fields={values.links} />
        </div>
      </div>
      <DialogFooter>
        <Button disabled={isFetching} form={formId} type="submit">
          {isFetching ? (
            <>
              <IconLoading className="mr-3 h-4 w-4" />
              請稍候
            </>
          ) : (
            "儲存"
          )}
        </Button>
      </DialogFooter>
    </>
  );
}

function ImagesForm({
  form,
  removeIds,
}: {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  removeIds: React.MutableRefObject<number[]>;
}) {
  const values = form.watch();

  const { fields, append, remove, move, insert } = useFieldArray({
    name: "links",
    control: form.control,
    rules: { maxLength: 10 },
  });

  const handleRemove = (index: number) => {
    remove(index);
    const deletedFieldId = values.links[index]?.id || null;
    if (deletedFieldId) removeIds.current.push(deletedFieldId);
  };

  const handleDuplicate = (index: number) => {
    const { id, link_id, key, ...dataToDuplicate } = values.links[index];
    insert(index + 1, dataToDuplicate);
  };

  return (
    <>
      <motion.div className="grid gap-3">
        {fields.map((fieldItem, index) => (
          <motion.div
            key={fieldItem.id}
            className="flex gap-2 rounded-lg border p-4 py-4"
          >
            <div className="flex flex-col justify-between gap-2 rounded-md bg-gray-100 px-1 py-2">
              <div className="flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDuplicate(index)}
                        type="button"
                        className="grid place-items-center"
                      >
                        <IconCopy />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>複製欄位</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleRemove(index)}
                        type="button"
                        className="grid place-items-center"
                      >
                        <IconDelete />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>刪除欄位</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          form.setValue(
                            `links.${index}.isShow`,
                            !values.links[index].isShow,
                          );
                        }}
                        type="button"
                        className="grid place-items-center"
                      >
                        {values.links[index].isShow ? (
                          <IconEye />
                        ) : (
                          <IconEyeHide />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {values.links[index].isShow ? "隱藏欄位" : "顯示欄位"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-col gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={index === 0}
                        onClick={() => move(index, index - 1)}
                        type="button"
                        className="grid place-items-center disabled:opacity-20"
                      >
                        <SolarArrowUpOutline />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>上移一格</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        disabled={index + 1 === values.links.length}
                        onClick={() => move(index, index + 1)}
                        type="button"
                        className="grid place-items-center disabled:opacity-20"
                      >
                        <SolarArrowDownOutline />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>下移一格</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div
              className={cn("flex flex-1 flex-col gap-4", {
                "opacity-50": !values.links[index].isShow,
              })}
            >
              <FormField
                control={form.control}
                name={`links.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={cn(
                        classes,
                        "flex w-full items-center overflow-hidden p-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                      )}
                    >
                      <FormLabel className="flex h-full w-14 items-center justify-center bg-gray-100">
                        標題
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="按鈕名稱"
                          className="h-full flex-1 px-2 py-2 outline-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={cn(
                        classes,
                        "flex w-full items-center overflow-hidden p-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                      )}
                    >
                      <FormLabel className="flex h-full w-14 items-center justify-center bg-gray-100">
                        連結
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="https://lank.at/"
                          className="h-full flex-1 px-2 py-2 outline-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {Boolean(fieldItem?.key) && (
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={"/admin/analytics?key=" + fieldItem.key}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm text-gray-400"
                        >
                          <SolarCursorBold />
                          <span>{fieldItem.clicks}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>點擊次數</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <Button
        disabled={fields.length >= 10}
        type="button"
        onClick={() => append(defaultData.links[0])}
      >
        新增連結
      </Button>
    </>
  );
}
