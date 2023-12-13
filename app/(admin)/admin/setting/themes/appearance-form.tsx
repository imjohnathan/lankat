"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ColorForm } from "@/components/ui/form/form-elements";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import PreviewPage from "@/components/userpage/Preview";
import templates from "@/lib/constants/templates.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@urql/next";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import { ProfileContext } from "../layout.client";
import { useDialog } from "./confirm-dialog";

const updateUserQuery = gql`
  mutation UpdateUser(
    $_set: users_set_input! = {
      bio: ""
      display_name: ""
      email: ""
      image: ""
      social_links: ""
      url_key: ""
    }
    $pk_columns: users_pk_columns_input!
  ) {
    update_users_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const appearanceFormSchema = z.object({
  theme: z.string({
    required_error: "Please select a theme.",
  }),
  isGradient: z.boolean().optional(),
  isModified: z.boolean().optional(),
  themeConfig: z.object({
    "bio-background-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "background-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "background-color-2": z.string().min(4).max(9).regex(/^#/).optional(),
    "text-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "button-background-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "button-background-color-hover": z
      .string()
      .min(4)
      .max(9)
      .regex(/^#/)
      .optional(),
    "button-border-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "button-border-width": z.string().optional(),
    "button-text-color": z.string().min(4).max(9).regex(/^#/).optional(),
    "button-text-color-hover": z.string().min(4).max(9).regex(/^#/).optional(),
    "button-radius": z.string().optional(),
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type ThemeConfigKeys =
  keyof typeof appearanceFormSchema.shape.themeConfig.shape;
type ThemeConfigPaths = {
  [K in ThemeConfigKeys]: `themeConfig.${K}`;
}[ThemeConfigKeys];

type NamePropType = "theme" | ThemeConfigPaths;

export function ThemeSelector({ form, name }: { form: any; name: string }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>頁面風格</FormLabel>
          <FormDescription>
            選擇您的喜愛的主題，搭配您的個人風格
          </FormDescription>
          <FormMessage />

          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={String(field.value)}
            className="grid max-w-md grid-cols-3 gap-5 pt-2"
            value={String(field.value)}
          >
            {templates.map((theme) => {
              const { id, name, preview } = theme;
              return (
                <FormItem key={id} className="flex cursor-pointer">
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value={String(id)} className="sr-only" />
                    </FormControl>
                    <div className="select-none items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <Image
                        src={preview}
                        alt={name}
                        width={150}
                        height={300}
                      />
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {name}
                    </span>
                  </FormLabel>
                </FormItem>
              );
            })}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
}

export function SliderFormWithPx({
  form,
  label,
  name,
  max,
  min,
  step,
}: {
  form: UseFormReturn<z.infer<typeof appearanceFormSchema>>;
  label: string;
  name: NamePropType;
  max: number;
  min: number;
  step: number;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex h-20 flex-row flex-wrap items-center justify-between space-y-0 rounded-lg border px-4">
          <FormLabel>{label}</FormLabel>
          <div className="text-base font-medium">{field.value}</div>
          <FormControl>
            <div className="w-full pb-1">
              <Slider
                onValueChange={(v) => field.onChange(`${v[0]}px`)}
                defaultValue={[+(field.value?.split("px")[0] ?? 2)]}
                max={max}
                min={min}
                step={step}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ThemeConfigForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof appearanceFormSchema>>;
}) {
  const values = form.watch();
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>整體背景設定</AccordionTrigger>
          <AccordionContent className="grid gap-3">
            <FormField
              control={form.control}
              name="isGradient"
              render={({ field }) => (
                <FormItem className="flex h-16 flex-row items-center justify-between space-y-0 rounded-lg border px-4">
                  <FormLabel className="text-sm">背景漸層</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {values.isGradient && (
              <ColorForm
                form={form}
                label={"上層顏色"}
                name={"themeConfig.background-color-2" as any}
              />
            )}
            <ColorForm
              form={form}
              label={values.isGradient ? "底部顏色" : "背景顏色"}
              name={"themeConfig.background-color" as any}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>個人簡介區塊</AccordionTrigger>
          <AccordionContent className="grid gap-3">
            <ColorForm
              form={form}
              label={"背景顏色"}
              name={"themeConfig.bio-background-color" as any}
            />
            <ColorForm
              form={form}
              label={"文字顏色"}
              name={"themeConfig.text-color" as any}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>按鈕設定</AccordionTrigger>
          <AccordionContent className="grid gap-3">
            <ColorForm
              form={form}
              label={"背景顏色"}
              name={"themeConfig.button-background-color" as any}
            />
            <ColorForm
              form={form}
              label={"懸浮時背景顏色"}
              name={"themeConfig.button-background-color-hover" as any}
            />
            <ColorForm
              form={form}
              label={"邊框顏色"}
              name={"themeConfig.button-border-color" as any}
            />
            <ColorForm
              form={form}
              label={"文字顏色"}
              name={"themeConfig.button-text-color" as any}
            />
            <ColorForm
              form={form}
              label={"懸浮文字顏色"}
              name={"themeConfig.button-text-color-hover" as any}
            />
            <SliderFormWithPx
              form={form}
              name={"themeConfig.button-border-width"}
              label={"邊框粗細"}
              min={0}
              max={20}
              step={1}
            />
            <SliderFormWithPx
              form={form}
              name={"themeConfig.button-radius"}
              label={"圓角"}
              min={0}
              max={50}
              step={1}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export function AppearanceForm() {
  const [{ fetching: updating }, updateUser] = useMutation(updateUserQuery);
  const { user } = useContext(ProfileContext);
  const userThemeID = user?.theme ? user?.theme.id : 0;
  const { openConfirm } = useDialog();
  const lastTheme = useRef(String(userThemeID));
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: String(userThemeID),
    isGradient: user?.theme?.settings
      ? Boolean(
          user?.theme?.settings["background-color"] !==
            user?.theme?.settings["background-color-2"],
        )
      : false,
    themeConfig: user?.theme?.settings,
    isModified: user?.theme?.isModified || false,
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });
  const preview = useRef<HTMLIFrameElement>(null);

  async function onSubmit(data: AppearanceFormValues) {
    try {
      const themeId = Number(data.theme);
      const themeTemplate = templates.find(({ id }) => id === themeId);
      const theme = {
        ...themeTemplate,
        isModified: data.isModified,
        settings: data.themeConfig,
      };
      const variables = {
        _set: {
          theme,
        },
        pk_columns: {
          id: user.id,
        },
      };
      const { data: updateData, error } = await updateUser(variables);
      if (error) throw new Error(error.message);
      toast.success("更新成功");
    } catch (e) {
      console.error(e);
      toast.error("更新失敗");
    }
  }

  const changeThemePreview = (theme: any) => {
    console.log("changeThemePreview fire");
    if (preview.current && preview.current.contentWindow) {
      const message = {
        type: "CSS_VARIABLES_UPDATE",
        theme,
      };
      preview.current.contentWindow.postMessage(message, "*");
    }
  };

  const changeThemePreviewDebounced = useDebouncedCallback((theme) => {
    changeThemePreview(theme);
  }, 100);

  const { isDirty, dirtyFields } = form.formState;
  const values = form.watch();
  console.log("form errors", form.formState.errors);
  useEffect(() => {
    const subscription = form.watch(async (data, { name, type }) => {
      if (type === "change" && name === "theme") {
        const theme = templates.find(({ id }) => id === Number(data.theme));
        if (theme) {
          if (data.isModified) {
            const result = await openConfirm();
            if (!result) {
              form.setValue("theme", lastTheme.current);
              return;
            }
            //form.reset({}, { keepValues: true });
          }

          const isGradient = Boolean(
            theme.settings["background-color"] !==
              theme.settings["background-color-2"],
          );
          form.setValue("isGradient", isGradient);

          form.setValue("themeConfig", theme?.settings);
          lastTheme.current = data.theme ?? "0";
          form.setValue("isModified", false);
          changeThemePreviewDebounced(theme);
        }
      } else if (
        type === "change" &&
        (name?.includes("themeConfig") || name === "isGradient")
      ) {
        const settings = data.themeConfig;
        if (!data.isGradient && settings?.["background-color"]) {
          form.setValue(
            "themeConfig.background-color-2",
            settings?.["background-color"] ?? "",
          );
        }
        const theme = templates.find(({ id }) => id === Number(data.theme));
        changeThemePreviewDebounced({ ...theme, settings });
        form.setValue("isModified", true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, isDirty, dirtyFields]);

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="col-span-3 space-y-8"
          >
            <ThemeSelector form={form} name="theme" />
            <ThemeConfigForm form={form} />
            <Button disabled={updating} type="submit">
              {updating ? (
                <>
                  <IconLoading className="mr-3 h-4 w-4" />
                  請稍候
                </>
              ) : (
                "儲存"
              )}
            </Button>
            {/* <code className="block whitespace-pre-wrap">
              {JSON.stringify(values, null, 2)}
            </code> */}
          </form>
        </Form>
        <div className="relative col-span-2">
          <div className="sticky top-0">
            <PreviewPage isFloating={false} ref={preview} />
          </div>
        </div>
      </div>
    </>
  );
}
