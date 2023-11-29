"use client";

import { FormStateContext } from "@/app/(admin)/hello/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import templates from "@/lib/constants/templates.json";
import { gql, useMutation, useQuery } from "@urql/next";
import { produce } from "immer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";

export function UserUrl(
  props: React.PropsWithChildren<{
    onNext: () => void;
  }>,
) {
  const { form, setForm } = useContext(FormStateContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      url_key: form.steps.userUrl.value.url_key,
    },
  });

  const { isDirty } = useFormState({
    control,
  });

  const { ref: urlRef, ...urlControl } = register("url_key", {
    required: true,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.userUrl.dirty = isDirty;
      }),
    );
  }, [isDirty, setForm]);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((formState) => {
            formState.steps.userUrl = {
              value,
              valid: true,
              dirty: false,
            };
          }),
        );

        props.onNext();
      })}
    >
      <div className={"flex flex-col space-y-4"}>
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            歡迎來到 Lank.at 任意門
          </h3>
          <p className="text-sm text-muted-foreground">選擇一個你喜歡的網址</p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>https://lank.at/</Label>
          <Input {...urlControl} ref={urlRef} />
        </div>

        <Button>下一步</Button>
      </div>
    </form>
  );
}

export function UserName(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>,
) {
  const query = gql`
    query getGenres {
      genres {
        name
        id
      }
    }
  `;

  const [result] = useQuery({ query });
  const { data, fetching, error } = result;

  const { form, setForm } = useContext(FormStateContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      display_name: form.steps.userName.value.display_name,
      genres: form.steps.userName.value.genres,
    },
  });

  const { isDirty } = useFormState({
    control,
  });

  const { ref: nameRef, ...nameControl } = register("display_name", {
    required: true,
  });

  const { ref: genreRef, ...genreControl } = register("genres", {});

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.userName.dirty = isDirty;
      }),
    );
  }, [isDirty, setForm]);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((formState) => {
            formState.steps.userName = {
              value,
              valid: true,
              dirty: false,
            };
          }),
        );

        props.onNext();
      })}
    >
      <div className={"flex flex-col space-y-4"}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="display_name">您的名稱</Label>
          <Input {...nameControl} ref={nameRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>分類</Label>
          <div className="grid grid-cols-2 gap-y-2">
            {data?.genres.map(({ id, name }) => (
              <div key={id} className="items-top flex space-x-2">
                <input
                  type="checkbox"
                  id={id}
                  ref={genreRef}
                  {...genreControl}
                  value={id}
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              props.onPrev();
            }}
          >
            上一步
          </Button>
          <Button>下一步</Button>
        </div>
      </div>
    </form>
  );
}

export function Styles(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>,
) {
  const query = gql`
    mutation updateUser(
      $uid: uuid!
      $display_name: String
      $theme: jsonb
      $theme_selected: Boolean
      $url_key: String
      $genres: [users_genres_insert_input!]!
    ) {
      update_users_by_pk(
        pk_columns: { id: $uid }
        _set: {
          display_name: $display_name
          theme: $theme
          theme_selected: $theme_selected
          url_key: $url_key
        }
      ) {
        id
      }
      insert_users_genres(objects: $genres) {
        affected_rows
        returning {
          id
        }
      }
    }
  `;
  const [updateUserResult, updateUser] = useMutation(query);
  const { data: session } = useSession();
  const { form, setForm } = useContext(FormStateContext);
  const router = useRouter();
  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      style: form.steps.styles.value.style,
    },
  });

  const { isDirty } = useFormState({
    control,
  });

  const { ref: stylesRef, ...stylesControl } = register("style", {
    required: true,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.styles.dirty = isDirty;
      }),
    );
  }, [isDirty, setForm]);

  const sendForm = async (value: string) => {
    try {
      const theme = templates.find(({ id }) => id === +value);
      const variables = {
        uid: session?.id,
        display_name: form.steps.userName.value.display_name,
        theme,
        theme_selected: true,
        url_key: form.steps.userUrl.value.url_key,
        genres: form.steps.userName.value.genres.map((genre) => ({
          genre_id: genre,
          user_id: session?.id,
        })),
      };
      const { data, error } = await updateUser(variables);
      toast.success("完成設定！開始拖拉吧～");
      router.push("/dnd");
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  return (
    <form
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((formState) => {
            formState.steps.styles = {
              value,
              valid: true,
              dirty: false,
            };
          }),
        );
        sendForm(value.style);
      })}
    >
      <div className={"flex flex-col space-y-4"}>
        <div className="grid w-full items-center gap-1.5">
          <Label>選擇一個你喜歡的風格吧</Label>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((theme) => {
              const { id, name, preview } = theme;
              return (
                <div key={id} className="relative">
                  <input
                    className={
                      "peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none"
                    }
                    type="radio"
                    ref={stylesRef}
                    {...stylesControl}
                    value={id}
                  />
                  <Image
                    className={
                      "rounded-md border-[6px] border-transparent transition-all duration-300 peer-checked:border-solid peer-checked:!border-blue-700 peer-hover:border-slate-300"
                    }
                    src={preview}
                    alt={name}
                    width={150}
                    height={300}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              props.onPrev();
            }}
          >
            上一步
          </Button>
          <Button>下一步</Button>
        </div>
      </div>
    </form>
  );
}
