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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import Preview from "@/components/widgets/preview/Banners";
import type { Widgets } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@urql/next";
import { motion } from "framer-motion";
import { useId, useRef } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import SolarArrowDownOutline from "~icons/solar/arrow-down-outline";
import SolarArrowUpOutline from "~icons/solar/arrow-up-outline";
import IconCopy from "~icons/solar/copy-outline";
import IconEyeHide from "~icons/solar/eye-line-duotone";
import IconEye from "~icons/solar/eye-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";

const mutation = gql`
  mutation UpdatedWidget($config: jsonb!, $id: uuid!) {
    update_widgets_by_pk(_set: { config: $config }, pk_columns: { id: $id }) {
      id
    }
  }
`;
const autoPlaySpeeds = ["3", "5", "10"];
const aspectRatios = ["1:1", "4:3", "16:9"];

export const defaultData = {
  autoPlay: true,
  autoPlaySpeed: "3",
  dots: true,
  aspectRatio: "16:9",
  links: [
    {
      id: "",
      name: "",
      url: "",
      isShow: true,
      link_id: "",
      key: "",
      image: "",
    },
    {
      id: "",
      name: "",
      url: "",
      isShow: true,
      link_id: "",
      key: "",
      image: "",
    },
    {
      id: "",
      name: "",
      url: "",
      isShow: true,
      link_id: "",
      key: "",
      image: "",
    },
  ],
};

export const FormSchema = z.object({
  autoPlay: z.boolean(),
  autoPlaySpeed: z.string(),
  aspectRatio: z.string(),
  dots: z.boolean(),
  links: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      url: z.string().url(),
      isShow: z.boolean(),
      link_id: z.string().optional(),
      clicks: z.number().optional(),
      key: z.string().optional(),
      image: z.string(),
    }),
  ),
});

export default function Banner({ widget }: { widget: Widgets }) {
  const { close } = useModalStore();
  const removeIds = useRef<string[]>([]);
  const formId = useId();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultData,
    },
  });

  const [{ fetching, error }, updateWidget] = useMutation(mutation);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      // if (error) throw new Error(error.message);
      toast.success("已儲存成功！");
      //close();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  }
  const values = form.watch();
  console.log(form.formState.errors);
  return (
    <>
      <DialogHeader>
        <DialogTitle>圖片看板</DialogTitle>
      </DialogHeader>
      <div className="flex">
        <ScrollArea className="min-h-48 max-h-[500px] flex-1 px-4">
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-3"
            >
              <FormField
                control={form.control}
                name="autoPlay"
                render={({ field }) => (
                  <FormItem className="flex h-10 flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2">
                    <FormLabel className="text-sm">自動播放</FormLabel>
                    <FormControl>
                      <Switch
                        className="scale-75"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoPlaySpeed"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "flex h-10 flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2",
                      { hidden: !values.autoPlay },
                    )}
                  >
                    <FormLabel>播放速度</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-5"
                      >
                        {autoPlaySpeeds.map((value) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {value}秒
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aspectRatio"
                render={({ field }) => (
                  <FormItem className="flex h-10 flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2">
                    <FormLabel>顯示比例</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-5"
                      >
                        {aspectRatios.map((value) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {value}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dots"
                render={({ field }) => (
                  <FormItem className="flex h-10 flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2">
                    <FormLabel className="text-sm">輪播導航</FormLabel>
                    <FormControl>
                      <Switch
                        className="scale-75"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <ImagesForm form={form} removeIds={removeIds} />
              {/* <code className="block whitespace-pre-wrap">
                {JSON.stringify(values, null, 2)}
              </code> */}
            </form>
          </Form>
        </ScrollArea>
        <div className="grid flex-1 place-items-center p-4">
          <Preview isPreview data={values} />
        </div>
      </div>
      <DialogFooter>
        <Button disabled={fetching} form={formId} type="submit">
          {fetching ? (
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
  form: UseFormReturn;
  removeIds: React.MutableRefObject<string[]>;
}) {
  const values = form.watch();

  const { fields, append, remove, move, insert } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const handleRemove = (index: number) => {
    remove(index);
    const deletedFieldId = values.links[index]?.id || null;
    if (deletedFieldId) removeIds.current.push(deletedFieldId);
  };

  const handleDuplicate = (index: number) => {
    const dataToDuplicate = {
      ...values.links[index],
      id: "",
      link_id: "",
      key: "",
    };
    insert(index + 1, dataToDuplicate);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="grid gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {fields.map((fieldItem, index) => (
          <motion.div
            key={fieldItem.id}
            variants={item}
            className="flex gap-2 rounded-lg border p-4 py-4"
          >
            <div className="flex flex-col justify-between rounded-md bg-gray-100 px-1 py-2">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleDuplicate(index)}
                  type="button"
                  className="grid place-items-center"
                >
                  <IconCopy />
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  type="button"
                  className="grid place-items-center"
                >
                  <IconDelete />
                </button>
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
                  {values.links[index].isShow ? <IconEye /> : <IconEyeHide />}
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                  type="button"
                  className="grid place-items-center disabled:opacity-20"
                >
                  <SolarArrowUpOutline />
                </button>
                <button
                  disabled={index + 1 === values.links.length}
                  onClick={() => move(index, index + 1)}
                  type="button"
                  className="grid place-items-center disabled:opacity-20"
                >
                  <SolarArrowDownOutline />
                </button>
              </div>
            </div>
            <div
              className={cn("flex flex-1 flex-col", {
                "opacity-50": !values.links[index].isShow,
              })}
            >
              <FormField
                control={form.control}
                name={`links.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>圖片標題</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>連結</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`links.${index}.image`}
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>圖片</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={
                              field.value ||
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mO8+Z+BAQAGawHafks3+QAAAABJRU5ErkJggg=="
                            }
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Input
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (
                              file.type !== "image/png" &&
                              file.type !== "image/jpeg"
                            ) {
                              toast.error(
                                "File type not supported (.png or .jpg only)",
                              );
                            } else {
                              const blob = new Blob([file], {
                                type: file.type,
                              });
                              const url =
                                URL.createObjectURL(blob) + "#" + file.type;
                              onChange(url);
                            }
                          }}
                          type="file"
                        />
                        <input className="hidden" type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <Button
        type="button"
        onClick={() =>
          append({
            id: "",
            name: "",
            url: "",
            isShow: true,
            link_id: "",
            key: "",
            image: "",
          })
        }
      >
        新增
      </Button>
    </>
  );
}
