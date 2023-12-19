import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { RadioForm } from "@/components/ui/form/form-elements";
import { ScrollArea } from "@/components/ui/scroll-area";
import Preview from "@/components/widgets/preview/Text";
import type { Widgets } from "@/gql/graphql";
import useModalStore from "@/stores/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@urql/next";
import { useEffect, useId } from "react";
import { useForm, useFormState } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

const bgStyles = [
  {
    label: "透明",
    value: "transparent",
  },
  {
    label: "卡片",
    value: "card",
  },
];

const bgValues = bgStyles.map(({ value }) => value);

const FormSchema = z.object({
  style: z.enum(bgValues as [string, ...string[]], {
    required_error: "請選擇一個樣式",
  }),
  textContent: z.string(),
});

export default function Separator({ widget }: { widget: Widgets }) {
  const { close, setUnSavedChanges } = useModalStore();
  const formId = useId();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: widget.config?.style || "transparent",
      textContent: widget.config?.textContent || "",
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
    style: "transparent" | "card";
    textContent: string;
  };

  const { isDirty } = useFormState({
    control: form.control,
  });

  useEffect(() => {
    if (isDirty) setUnSavedChanges(true);
  }, [isDirty]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>文字工具</DialogTitle>
      </DialogHeader>
      <div className="flex min-h-[300px]">
        <ScrollArea className="min-h-48 max-h-[500px] flex-1 px-4">
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-3"
            >
              <RadioForm<z.infer<typeof FormSchema>>
                form={form}
                label="背景樣式"
                name="style"
                items={bgStyles}
              />
              <FormField
                control={form.control}
                name={"textContent"}
                render={({ field }) => {
                  return (
                    <>
                      <ReactQuill
                        className="h-[205px] rounded-lg"
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              { align: [] },
                            ],
                            [{ color: [] }, { background: [] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["clean"],
                          ],
                        }}
                      />
                      <style jsx>
                        {`
                          .ql-editor {
                            background-color: rgb(241 245 249);
                          }
                          .ql-toolbar.ql-snow {
                            border-top-left-radius: var(--radius);
                            border-top-right-radius: var(--radius);
                          }
                          .ql-container.ql-snow {
                            border-bottom-right-radius: var(--radius);
                            border-bottom-left-radius: var(--radius);
                          }
                          .ql-toolbar.ql-snow,
                          .ql-container.ql-snow {
                            border-color: hsl(var(--border));
                          }
                          .ql-toolbar.ql-snow .ql-formats {
                            margin-right: 10px;
                          }
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-label[data-value="1"]::before,
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-item[data-value="1"]::before {
                            content: "標題 1";
                          }
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-label[data-value="2"]::before,
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-item[data-value="2"]::before {
                            content: "標題 2";
                          }
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-label[data-value="3"]::before,
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-item[data-value="3"]::before {
                            content: "標題 3";
                          }
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-label::before,
                          .ql-snow
                            .ql-picker.ql-header
                            .ql-picker-item::before {
                            content: "一般內文";
                          }
                        `}
                      </style>
                    </>
                  );
                }}
              />
              <code className="block whitespace-pre-wrap">
                {JSON.stringify(form.getValues(), null, 2)}
              </code>
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
