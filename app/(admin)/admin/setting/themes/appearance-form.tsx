"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PreviewPage from "@/components/userpage/Preview";
import templates from "@/lib/constants/templates.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@urql/next";
import Image from "next/image";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import { ProfileContext } from "../layout.client";

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
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.

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

export function AppearanceForm() {
  const [{ fetching: updating }, updateUser] = useMutation(updateUserQuery);
  const { user } = useContext(ProfileContext);
  const userThemeID = user?.theme ? user?.theme.id : 0;
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: String(userThemeID),
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });
  const preview = useRef<HTMLIFrameElement>(null);

  async function onSubmit(data: AppearanceFormValues) {
    try {
      const themeId = Number(data.theme);
      const theme = templates.find(({ id }) => id === themeId);
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
    if (preview.current && preview.current.contentWindow) {
      const message = {
        type: "CSS_VARIABLES_UPDATE",
        theme,
      };
      preview.current.contentWindow.postMessage(message, "*");
    }
  };

  const watchTheme = form.watch((data, { name, type }) => {
    if (type === "change" && name === "theme") {
      const theme = templates.find(({ id }) => id === Number(data[name]));
      changeThemePreview(theme);
    }
  });

  return (
    <div className="grid grid-cols-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-4 space-y-8"
        >
          <ThemeSelector form={form} name="theme" />
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
        </form>
      </Form>
      <PreviewPage wrapperClass="mt-[-80px]" isFloating={false} ref={preview} />
    </div>
  );
}
