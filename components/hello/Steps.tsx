'use client';

import { FormStateContext, Loading } from '@/app/(admin)/admin/hello/client';
import { ThemeSelector } from '@/app/(admin)/admin/setting/themes/appearance-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, classes } from '@/components/ui/input';
import PreviewPage from '@/components/userpage/Preview';
import type { Genres } from '@/gql/graphql';
import templates from '@/lib/constants/templates.json';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation, useQuery } from '@urql/next';
import { useAnimate } from 'framer-motion';
import { produce } from 'immer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import IconLoading from '~icons/line-md/loading-twotone-loop';

export function UserUrl(
  props: React.PropsWithChildren<{
    onNext: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);
  const schema = z.object({
    url_key: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-z0-9_-]*$/)
  });

  const { register, handleSubmit, control, setValue, getValues } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    shouldUseNativeValidation: true,
    defaultValues: {
      url_key: form.steps.userUrl.value.url_key
    }
  });

  const { isDirty } = useFormState({
    control
  });

  const { ref: urlRef, ...urlControl } = register('url_key', {
    required: true
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.userUrl.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  useEffect(() => {
    if (!getValues('url_key')) setValue('url_key', form.steps.userUrl.value.url_key);
  }, [form]);

  return (
    <form
      onSubmit={handleSubmit(async (value) => {
        // const res = await fetch("/api/checkUrlKey?key=" + value.url_key);
        // const data = await res.json();
        setForm(
          produce((formState) => {
            formState.steps.userUrl = {
              value,
              valid: true,
              dirty: false
            };
          })
        );
        props.onNext();
      })}
    >
      <div className={'flex flex-col space-y-4'}>
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">歡迎來到 Lank.at 任意門</h3>
          <p className="text-sm text-muted-foreground">選擇一個你喜歡的網址</p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <div
            className={cn(
              classes,
              'flex w-full items-center transition duration-75 ease-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
            )}
          >
            <div>{process.env.NEXT_PUBLIC_SITE_URL}/u/</div>
            <input
              className="h-full flex-1 px-2 py-2 outline-0 <sm:max-w-[100px]"
              {...urlControl}
              placeholder="你的專屬網址"
              ref={urlRef}
            />
          </div>
          <p className="text-sm text-muted-foreground">至少3個最多20個字元。只可使用小寫英文字母且不可使用特殊符號。</p>
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
  }>
) {
  const query = gql`
    query getGenres {
      genres {
        name
        id
      }
    }
  `;

  const [{ data, fetching, error }] = useQuery({ query });

  const { form, setForm } = useContext(FormStateContext);

  const FormSchema = z.object({
    display_name: z.string().min(2, { message: 'You have to enter a display name.' }).max(20),
    genres: z.array(z.number()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.'
    })
  });

  const formField = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      display_name: form.steps.userName.value.display_name,
      genres: form.steps.userName.value.genres
    }
  });

  const { isDirty } = useFormState({
    control: formField.control
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.userName.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  return (
    <Form {...formField}>
      <form
        onSubmit={formField.handleSubmit((value) => {
          setForm(
            produce((formState) => {
              formState.steps.userName = {
                value,
                valid: true,
                dirty: false
              };
            })
          );

          props.onNext();
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <FormField
            control={formField.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>您的名稱</FormLabel>
                <FormControl>
                  <Input placeholder="您的名稱" {...field} />
                </FormControl>
                <FormDescription>這個名稱將顯示在您個人名片上</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formField.control}
            name="genres"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>分類</FormLabel>
                  <FormDescription>以下哪些分類最能描述您呢？</FormDescription>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {data?.genres.map(({ id, name }: Genres) => (
                    <FormField
                      key={id}
                      control={formField.control}
                      name="genres"
                      render={({ field }) => {
                        return (
                          <FormItem key={id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, id])
                                    : field.onChange(field.value?.filter((value) => value !== id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{name}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
    </Form>
  );
}

export function Styles(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>
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
        _set: { display_name: $display_name, theme: $theme, theme_selected: $theme_selected, url_key: $url_key }
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
  const [{ fetching }, updateUser] = useMutation(query);
  const { data: session } = useSession();
  const { form, setForm } = useContext(FormStateContext);
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);

  const appearanceFormSchema = z.object({
    theme: z.string({
      required_error: 'Please select a theme.'
    })
  });

  type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: form.steps.theme.value.theme || '0'
  };

  const formField = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues
  });
  const preview = useRef<HTMLIFrameElement>(null);

  const changeThemePreview = (theme: any) => {
    if (preview.current && preview.current.contentWindow) {
      const message = {
        type: 'CSS_VARIABLES_UPDATE',
        theme
      };
      preview.current.contentWindow.postMessage(message, '*');
    }
  };

  const watchTheme = formField.watch((data, { name, type }) => {
    if (type === 'change' && name === 'theme') {
      const theme = templates.find(({ id }) => id === Number(data[name]));
      changeThemePreview(theme);
    }
  });

  const { isDirty } = useFormState({
    control: formField.control
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.theme.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoad, 5000);

    const handleLoad = () => {
      setIsIframeLoaded(true);
      clearTimeout(timeout);
    };

    const iframe = preview.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
      clearTimeout(timeout);
    };
  }, []);

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
          user_id: session?.id
        }))
      };
      const { data, error } = await updateUser(variables);
      if (error) throw new Error(error.message);
      toast.success('任意門建立成功!');
      window.scrollTo(0, 0);
      props.onNext();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error('錯誤：' + e.message);
        throw new Error(e.message);
      } else {
        setForm(
          produce((form) => {
            form.steps.theme.valid = false;
          })
        );
        console.error('An unknown error occurred');
        throw new Error('An unknown error occurred');
      }
    } finally {
    }
  };

  return (
    <Form {...formField}>
      <form
        className={cn({ 'h-0 opacity-0': !isIframeLoaded })}
        onSubmit={formField.handleSubmit((value) => {
          setForm(
            produce((formState) => {
              formState.steps.theme = {
                value,
                valid: true,
                dirty: false
              };
            })
          );
          sendForm(value.theme);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <div className="grid grid-cols-1 sm:grid-cols-5">
            <div className="sm:col-span-4">
              <ThemeSelector form={formField} name="theme" />
            </div>
            <PreviewPage
              wrapperClass="mt-[-80px] <sm:hidden"
              isFloating={false}
              src={`/admin/preview?mocking&username=${form.steps.userName.value.display_name}`}
              ref={preview}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              disabled={fetching}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                props.onPrev();
              }}
            >
              上一步
            </Button>
            <Button disabled={fetching} type="submit">
              {fetching ? (
                <>
                  <IconLoading className="mr-3 h-4 w-4" />
                  請稍候
                </>
              ) : (
                '下一步'
              )}
            </Button>
          </div>
        </div>
      </form>
      <div className={cn({ 'h-0 opacity-0': isIframeLoaded })}>
        <Loading />
      </div>
    </Form>
  );
}

export function Finish(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);
  const [scope, animate] = useAnimate();
  const preview = useRef<HTMLIFrameElement>(null);
  const refAnimationInstance = useRef(null);
  const router = useRouter();
  const FormSchema = z.object({
    finish: z.boolean()
  });
  const { update } = useSession();

  const formField = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      finish: form.steps.finish.dirty
    }
  });

  const { isDirty } = useFormState({
    control: formField.control
  });

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: {}) => {
    const confetti = refAnimationInstance.current as any;
    confetti &&
      confetti({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  }, []);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.finish.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoad, 5000);

    const animation = async () => {
      await animate('.iframe', { opacity: 0, x: 0, y: 0, scale: 1 });
      await animate('.finish', { opacity: 0, x: 0, y: 50, scale: 1.2 });
      await animate(
        '.iframe',
        {
          opacity: 1,
          y: -100,
          scale: 0.7
        },
        { ease: 'easeOut', duration: 2 }
      );
      makeShot(2, {
        spread: 100,
        startVelocity: 55
      });
      await animate('.finish', { opacity: 1, x: 0, y: 0, scale: 1 }, { ease: 'easeOut', duration: 1 });
    };

    const handleLoad = () => {
      clearTimeout(timeout);
      setIsIframeLoaded(true);
      animation();
    };
    const iframe = preview.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Form {...formField}>
      <form
        className={cn({ 'h-0 opacity-0': !isIframeLoaded })}
        ref={scope}
        onSubmit={formField.handleSubmit(async (value) => {
          setForm(
            produce((formState) => {
              formState.steps.finish = {
                valid: true,
                dirty: false
              };
            })
          );
          await update();
          //router.push("/admin");
          window.location.replace('/admin');
        })}
      >
        <div className="flex flex-col relative">
          <div className="relative z-[-1] grid">
            <ReactCanvasConfetti
              refConfetti={getInstance}
              style={{
                position: 'fixed',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0
              }}
            />
            <div className="iframe <sm:w-screen relative <sm:ml-[-50vw] <sm:left-[50%]" style={{ opacity: 0 }}>
              <PreviewPage
                isFloating={false}
                wrapperClass="scale-100"
                src={`/admin/preview?mocking&username=${form.steps.userName.value.display_name}&themeId=${form.steps.theme.value.theme}`}
                ref={preview}
              />
            </div>
          </div>

          <div style={{ opacity: 0 }} className="finish mt-[-150px] grid w-60 grid-cols-1 gap-4 self-center">
            <Button className="h-12 text-lg" type="submit">
              開始打造我的任意門
            </Button>
            <button
              className="text-sm text-gray-500"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                props.onPrev();
              }}
            >
              上一步
            </button>
          </div>
        </div>
      </form>
      <div className={cn({ 'h-0 opacity-0': isIframeLoaded })}>
        <Loading />
      </div>
    </Form>
  );
}
