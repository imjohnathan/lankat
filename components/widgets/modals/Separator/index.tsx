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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import Preview from "@/components/widgets/preview/Separator";
import type { Widgets } from "@/gql/graphql";
import useModalStore from "@/stores/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Sketch from "@uiw/react-color-sketch";
import { gql, useMutation } from "@urql/next";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";

const mutation = gql`
  mutation UpdatedWidget($config: jsonb!, $id: uuid!) {
    update_widgets_by_pk(_set: { config: $config }, pk_columns: { id: $id }) {
      id
    }
  }
`;

const separatorStyles = [
  {
    label: "實線",
    value: "solid",
  },
  {
    label: "虛線",
    value: "dashed",
  },
  {
    label: "點線",
    value: "dotted",
  },
  {
    label: "雙線",
    value: "double",
  },
];

const separatorValues = separatorStyles.map(({ value }) => value);

const FormSchema = z.object({
  style: z.enum(separatorValues as [string, ...string[]], {
    required_error: "請選擇一個樣式",
  }),
  width: z.number().min(1).max(20).default(2),
  color: z.string().default("#000000"),
  marginTop: z.number().min(0).max(100).default(0),
  marginBottom: z.number().min(0).max(100).default(0),
  widthValue: z.number().min(1).max(100).default(80),
});

export default function Separator({ widget }: { widget: Widgets }) {
  const { close } = useModalStore();
  const formId = useId();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: widget.config?.style || "solid",
      width: widget.config?.width || 2,
      color: widget.config?.color || "#000000",
      marginTop: widget.config?.marginTop || 0,
      marginBottom: widget.config?.marginBottom || 0,
      widthValue: widget.config?.widthValue || 80,
    },
  });
  const [{ fetching, error }, updateWidget] = useMutation(mutation);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { error } = await updateWidget({
        id: widget.id,
        config: data,
      });
      if (error) throw new Error(error.message);
      toast.success("已儲存成功！");
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
    }
  }
  const config = form.watch() as {
    style: "solid" | "dashed" | "dotted" | "double";
    width: number;
    color: string;
    marginTop: number;
    marginBottom: number;
    widthValue: number;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>分隔線</DialogTitle>
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
                name="style"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>樣式</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-5"
                      >
                        {separatorStyles.map(({ label, value }) => (
                          <FormItem
                            key={value}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {label}
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
                name="width"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>粗細</FormLabel>
                    <FormControl>
                      <div>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value]}
                          max={20}
                          min={1}
                          step={1}
                        />
                        <div className="pt-2 text-base font-medium">
                          {config.width}px
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>顏色</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger className="block">
                          <div
                            className="h-10 w-10 rounded-full border-2 border-solid border-gray-300"
                            style={{ backgroundColor: config.color }}
                          />
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-[218px] p-1">
                          <Sketch
                            style={{
                              width: "100%",
                              borderRadius: 0,
                              boxShadow: "none",
                            }}
                            color={field.value}
                            onChange={(color) => field.onChange(color.hexa)}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marginTop"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>上間距</FormLabel>
                    <FormControl>
                      <div>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value]}
                          max={100}
                          min={0}
                          step={1}
                        />
                        <div className="pt-2 text-base font-medium">
                          {config.marginTop}px
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marginBottom"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>下間距</FormLabel>
                    <FormControl>
                      <div>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value]}
                          max={100}
                          min={0}
                          step={1}
                        />
                        <div className="pt-2 text-base font-medium">
                          {config.marginBottom}px
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="widthValue"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>寬度</FormLabel>
                    <FormControl>
                      <div>
                        <Slider
                          onValueChange={(v) => field.onChange(v[0])}
                          defaultValue={[field.value]}
                          max={100}
                          min={1}
                          step={1}
                        />
                        <div className="pt-2 text-base font-medium">
                          {config.widthValue}%
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <div className="grid flex-1 place-items-center">
          <Preview isPreview config={config} />
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