"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, classes } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  cn,
  getUrlWithoutUTMParams,
  paramsMetadata,
  truncate,
} from "@/lib/utils";
import { gql, useMutation } from "@urql/next";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import Preview from "./Preview";

interface AddLinksModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormData {
  key: string;
  url: string;
  title: string;
  status: string;
  clicks: number;
  parameters: Record<string, string>;
  og_image: string;
  og_title: string;
  og_description: string;
}

const FORM_DATA = {
  key: "",
  url: "",
  clicks: 0,
  parameters: {},
  og_image: "",
  og_title: "",
  og_description: "",
};

const query = gql`
  mutation AddLinks($object: links_insert_input = { clicks: "", key: "" }) {
    insert_links_one(object: $object) {
      id
    }
  }
`;

export default function AddLinksModal({ open, setOpen }: AddLinksModalProps) {
  const [data, setData] = useState(FORM_DATA as FormData);
  const { url, key, og_image, og_title, og_description } = data;
  const [generatingMetatags, setGeneratingMetatags] = useState(false);
  const [debouncedUrl] = useDebounce(getUrlWithoutUTMParams(url), 500);
  const [addLinkResult, addLink] = useMutation(query);
  const generateKey = () => {
    setData(
      produce((data) => {
        data.key = nanoid(7);
      }),
    );
  };

  useEffect(() => {
    if (open && debouncedUrl.length > 0) {
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
                data.og_title = truncate(results.title, 120);
                data.og_description = truncate(results.description, 240);
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
    }
  }, [debouncedUrl, open, key]);

  const sendForm = async () => {
    try {
      const variables = {
        object: {
          ...data,
          parameters: data.parameters || {},
        },
      };
      const { data: result, error } = await addLink(variables);
      console.log(result);
      toast.success("連結新增成功！");
      setOpen(false);
      setData(FORM_DATA as FormData);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="max-w-screen-lg sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>新增連結</DialogTitle>
          <DialogDescription>
            新增完成後就可顯示在頁面裡面啦！
          </DialogDescription>
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
                <Label htmlFor="url">連結網址</Label>
                <Input
                  id="url"
                  value={url}
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
                <div className="flex justify-between">
                  <Label htmlFor="key">短網址</Label>
                  <button
                    className="text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      generateKey();
                    }}
                  >
                    隨機產生
                  </button>
                </div>
                <div tabIndex="0" className={cn(classes, "flex")}>
                  <div className=" text-slate-400">https://lank.at/s/</div>
                  <input
                    className="h-full flex-1 pl-2 outline-0"
                    type="text"
                    id="key"
                    value={key}
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
                <Label htmlFor="og_image">OG Image</Label>
                <Input
                  id="og_image"
                  value={og_image}
                  onChange={(e) => {
                    setData(
                      produce((data) => {
                        data.og_image = e.target.value;
                      }),
                    );
                  }}
                />
              </div>
              <div>
                <Label htmlFor="og_title">OG Title</Label>
                <Input
                  id="og_title"
                  value={og_title}
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
                <Label htmlFor="og_description">OG Description</Label>
                <Input
                  id="og_description"
                  value={og_description}
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
          <Button form="linkForm" type="submit">
            儲存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UTMsection({
  data,
  setData,
}: {
  data: FormData;
  setData: Dispatch<SetStateAction<FormData>>;
}) {
  const { parameters } = data;
  return (
    <div>
      {paramsMetadata.map(({ display, key, examples }, index) => (
        <div key={key}>
          <Label htmlFor="og_description">{display}</Label>
          <Input
            name={key}
            id={key}
            value={parameters[key] || ""}
            onChange={(e) => {
              setData(
                produce((data) => {
                  data.parameters[key] = e.target.value;
                }),
              );
            }}
          />
        </div>
      ))}
    </div>
  );
}

function generateRandomKey(length: number = 7): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
