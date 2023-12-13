"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, classes } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import {
  cn,
  getUrlWithoutUTMParams,
  isValidUrl,
  paramsMetadata,
  truncate,
} from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import { gql, useMutation } from "@urql/next";
import { produce } from "immer";
import { nanoid } from "nanoid";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import ImageUpload from "./ImageUpload";
import Preview from "./Preview";

interface FormDataType {
  id?: string;
  key: string;
  url: string;
  parameters: any;
  og_image: string;
  og_title: string;
  og_description: string;
  og_image_fileName?: string;
}

const FORM_DATA = {
  id: "",
  key: "",
  url: "",
  parameters: {},
  og_image: "",
  og_title: "",
  og_description: "",
};

const query = gql`
  mutation AddLinks($object: links_insert_input!) {
    insert_links_one(
      object: $object
      on_conflict: {
        constraint: links_id_key
        update_columns: [
          key
          url
          clicks
          og_image
          og_title
          og_description
          parameters
        ]
      }
    ) {
      id
    }
  }
`;

export default function AddLinksModal({ link }: { link: any }) {
  const { isOpen, close } = useModalStore();
  const [data, setData] = useState(FORM_DATA as FormDataType);
  const { url, key, og_image, og_title, og_description } = data;
  const [generatingMetatags, setGeneratingMetatags] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url ?? ""), 500);
  const [{ fetching }, addLink] = useMutation(query);
  const isLoading = useMemo(
    () => fetching || generatingMetatags || uploading,
    [, fetching, generatingMetatags, uploading],
  );
  const generateKey = () => {
    setData(
      produce((data) => {
        data.key = nanoid(7);
      }),
    );
  };

  const getMetaTags = useCallback(async () => {
    try {
      if (!key) generateKey();
      setData(
        produce((data) => {
          data.og_title = "";
          data.og_description = "";
          data.og_image = "";
        }),
      );
      // if url is valid, continue to generate metatags, else return null
      new URL(debouncedUrl);
      setGeneratingMetatags(true);
      fetch(`/api/metatags?url=${debouncedUrl}`).then(async (res) => {
        if (res.status === 200) {
          const results = await res.json();
          setData(
            produce((data) => {
              data.og_title = truncate(results.title, 120) ?? "";
              data.og_description = truncate(results.description, 240) ?? "";
              data.og_image = results.image;
            }),
          );
        }
        // set timeout to prevent flickering
        setTimeout(() => setGeneratingMetatags(false), 200);
      });
    } catch (e) {
      console.log("not a valid url");
    }
  }, [debouncedUrl, isOpen, data.id, og_title, og_image, og_description]);
  useEffect(() => {
    if (
      isOpen &&
      debouncedUrl.length > 0 &&
      !data.id &&
      !(og_title || og_image || og_description)
    ) {
      getMetaTags();
    }
  }, [debouncedUrl, isOpen, data.id, og_title, og_image, og_description]);

  useEffect(() => {
    if (link) {
      setData(
        produce((data) => {
          data.id = link.id;
          data.key = link.key;
          data.url = link.url;
          data.og_image = link.og_image;
          data.og_title = link.og_title;
          data.og_description = link.og_description;
          data.parameters = link.parameters;
        }),
      );
    }
  }, [link]);

  const handleFileUpload = async (blobUrl: string, fileName: string) => {
    setUploading(true);
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      const extension = fileName.split(".").pop();
      const filePath = `uploads/${new Date().getTime()}_${nanoid(
        16,
      )}.${extension}`;

      const { error } = await supabase.storage
        .from("links")
        .upload(filePath, blob);

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("links").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("upload error", error as Error);
    } finally {
      setUploading(false);
    }
  };

  const sendForm = async () => {
    try {
      if (!data.url || !isValidUrl(data.url))
        return toast.error("請輸入正確連結網址！");
      let dataToSend = { ...data };
      if (!data.id) {
        const { id, ...rest } = dataToSend;
        dataToSend = rest;
      }
      if (
        dataToSend?.og_image_fileName &&
        dataToSend.og_image.startsWith("blob:")
      ) {
        const imageUrl = await handleFileUpload(
          dataToSend.og_image,
          dataToSend.og_image_fileName ?? "",
        );
        dataToSend.og_image = imageUrl ?? "";
        const { og_image_fileName, ...rest } = dataToSend;
        dataToSend = rest;
      }
      const variables = {
        object: {
          ...dataToSend,
          parameters: data.parameters || {},
        },
      };
      const { error } = await addLink(variables);
      if (error) throw new Error(error.message);
      toast.success("連結新增成功！");
      close();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        if (e.message.includes("links_key_key"))
          e.message = "短網址已存在，請換一個試試";
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>新增連結</DialogTitle>
        <DialogDescription>新增完成後就可顯示在頁面裡面啦！</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        <ScrollArea className="h-[400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendForm();
            }}
            id="linkForm"
            className="grid gap-3 px-4"
          >
            <div>
              <div className="flex items-center justify-between pb-1">
                <Label htmlFor="url">連結網址</Label>
                <button
                  type="button"
                  className="text-xs font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    const go = confirm(
                      "重新抓取會清除標題、圖片、敘述，確定要重新抓取嗎？",
                    );
                    if (go) getMetaTags();
                  }}
                >
                  重新抓取
                </button>
              </div>
              <Input
                id="url"
                value={url ?? ""}
                onChange={(e) => {
                  setData(
                    produce((data) => {
                      data.url = e.target.value;
                    }),
                  );
                }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between pb-1">
                <Label htmlFor="key">短網址</Label>
                <button
                  className="text-xs font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    let go = true;
                    if (data.id) {
                      go = confirm(
                        "重新產生會清除原有的短網址，過往的點擊成效將歸零，確定要重新產生嗎？",
                      );
                    }
                    if (go) generateKey();
                  }}
                >
                  隨機產生
                </button>
              </div>
              <div tabIndex={0} className={cn(classes, "flex")}>
                <div className=" text-slate-400">https://lank.at/s/</div>
                <input
                  className="h-full flex-1 pl-2 outline-0"
                  type="text"
                  id="key"
                  value={key ?? ""}
                  onChange={(e) => {
                    setData(
                      produce((data) => {
                        data.key = e.target.value;
                      }),
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <Label className="pb-1" htmlFor="og_image">
                OG Image
              </Label>
              <ImageUpload
                data={data}
                setData={setData}
                filedName="og_image"
                filedFileName="og_image_fileName"
              />
            </div>
            <div>
              <Label className="pb-1" htmlFor="og_title">
                OG Title
              </Label>
              <Input
                id="og_title"
                value={og_title ?? ""}
                onChange={(e) => {
                  setData(
                    produce((data) => {
                      data.og_title = e.target.value;
                    }),
                  );
                }}
              />
            </div>
            <div>
              <Label className="pb-1" htmlFor="og_description">
                OG Description
              </Label>
              <Input
                id="og_description"
                value={og_description ?? ""}
                onChange={(e) => {
                  setData(
                    produce((data) => {
                      data.og_description = e.target.value;
                    }),
                  );
                }}
              />
            </div>
            <UTMsection {...{ data, setData }} />
          </form>
        </ScrollArea>
        <Preview {...{ data }} />
      </div>
      <DialogFooter>
        <Button disabled={isLoading} form="linkForm" type="submit">
          {isLoading ? (
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

function UTMsection({
  data,
  setData,
}: {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}) {
  const { parameters } = data;
  const isObjectEmpty = (objectName: {}) => {
    return JSON.stringify(objectName) === "{}";
  };
  const [utm, setUtm] = useState(false);

  useEffect(() => {
    const initUtm = parameters ? !isObjectEmpty(parameters) : false;
    setUtm(initUtm);
  }, [parameters]);
  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2",
        )}
      >
        <Label className="text-sm">UTM 參數設定</Label>
        <Switch className="scale-75" checked={utm} onCheckedChange={setUtm} />
      </div>
      {utm && (
        <div className="grid gap-3 rounded-lg border p-4 py-4">
          {paramsMetadata.map(({ display, key, examples }, index) => (
            <div
              key={key}
              className={cn(
                classes,
                "flex w-full items-center overflow-hidden p-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              )}
            >
              <Label
                htmlFor={key}
                className="flex h-full w-28 items-center justify-center bg-gray-100 text-xs"
              >
                {display}
              </Label>
              <input
                className="h-full flex-1 px-2 py-2 outline-0"
                name={key}
                id={key}
                value={parameters?.[key] ?? ""}
                onChange={(e) => {
                  setData(
                    produce((data: any) => {
                      data.parameters[key] = e.target.value;
                    }),
                  );
                }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
