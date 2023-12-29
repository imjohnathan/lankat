import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { classes } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FooterButton from '@/components/widgets/modals/FooterButtons';
import { PreviewItem } from '@/components/widgets/preview/Buttons';
import { upsertWidget } from '@/gql/fragments/upsertWidgetLinks';
import type { Widgets } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import useModalStore from '@/stores/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@urql/next';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { UseFormReturn, useFieldArray, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import SolarArrowDownOutline from '~icons/solar/arrow-down-outline';
import SolarArrowUpOutline from '~icons/solar/arrow-up-outline';
import IconCopy from '~icons/solar/copy-outline';
import SolarCursorBold from '~icons/solar/cursor-bold';
import IconEyeHide from '~icons/solar/eye-line-duotone';
import IconEye from '~icons/solar/eye-outline';
import IconDelete from '~icons/solar/trash-bin-minimalistic-outline';

export const defaultData = {
  links: [
    {
      name: '',
      url: '',
      isShow: true,
      image: ''
    }
  ]
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
      image: z.string().optional()
    })
  )
});

export function Preview({ fields: { links } }: { fields: z.infer<typeof FormSchema> }) {
  return (
    <div className="mx-auto grid w-full max-w-[480px] grid-cols-1 gap-4">
      {links.map(({ name, url, isShow }, index) => (
        <PreviewItem key={index} name={name ?? ''} url={url ?? ''} isShow={isShow ?? true} isPreview />
      ))}
    </div>
  );
}

export default function Banner({ widget }: { widget: Widgets }) {
  const { close, setUnSavedChanges } = useModalStore();
  const [isPreview, setIsPreview] = useState(false);
  const removeIds = useRef<number[]>([]);
  const formId = useId();
  const dataFromWidget: z.infer<typeof FormSchema> = {
    links:
      widget.widgets_links.length === 0
        ? defaultData.links
        : widget.widgets_links.map((link) => ({
            ...(link.id && { id: link.id }),
            ...(link.link?.id && { link_id: link.link?.id }),
            name: link.name || '',
            url: link?.link?.url || '',
            isShow: link.isShow ?? true,
            key: link.link?.key || '',
            image: link.link?.image || '',
            clicks: link.link?.clicks || 0
          }))
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultData,
      ...dataFromWidget
    }
  });
  const { isDirty } = useFormState({
    control: form.control
  });

  const [{ fetching }, upsertWidgetLinks] = useMutation(upsertWidget);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFetching = fetching || isSubmitting;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      const variablesLinks = data.links.map((field, index) => {
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
              ...(!field.id && { key: nanoid(7) })
            },
            on_conflict: {
              constraint: 'links_pkey',
              update_columns: ['url', 'image']
            }
          }
        };
        return fieldData;
      });

      const variables = {
        object: {
          id: widget.id,
          isShow: widget.isShow,
          name: widget.name,
          widgets_links: {
            data: variablesLinks,
            on_conflict: {
              constraint: 'widgets_links_pkey',
              update_columns: ['name', 'link_id', 'isShow', 'sort']
            }
          }
        },
        deleteIds: { id: { _in: removeIds.current } }
      };
      const { error } = await upsertWidgetLinks(variables);
      if (error) throw new Error(error.message);
      toast.success('儲存成功！');
      close();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error('錯誤：' + e.message);
        throw new Error(e.message);
      } else {
        console.error('An unknown error occurred');
        throw new Error('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isDirty) setUnSavedChanges(true);
  }, [isDirty]);

  useEffect(() => {
    form.setFocus('links.0.name');
  }, []);

  const values = form.watch();
  return (
    <>
      <DialogHeader>
        <DialogTitle>連結按鈕</DialogTitle>
      </DialogHeader>
      <div className="flex flex-1">
        <ScrollArea className={cn('sm:max-h-[500px] flex-1 sm:px-4', { hidden: isPreview })}>
          <Form {...form}>
            <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 pb-4">
              <FormArray form={form} removeIds={removeIds} />
            </form>
          </Form>
        </ScrollArea>
        <div
          className={cn(
            'grid flex-1 place-items-center p-4 max-w-[480px]',
            { '<sm:hidden': !isPreview },
            { 'max-h-[500px]': isPreview }
          )}
        >
          <Preview fields={values} />
        </div>
      </div>
      <DialogFooter className="<sm:flex-row gap-3">
        <FooterButton setIsPreview={setIsPreview} isPreview={isPreview} isFetching={isFetching} formId={formId} />
      </DialogFooter>
    </>
  );
}

function FormArray({
  form,
  removeIds
}: {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  removeIds: React.MutableRefObject<number[]>;
}) {
  const values = form.watch();

  const { fields, append, remove, move, insert } = useFieldArray({
    name: 'links',
    control: form.control,
    rules: { maxLength: 10 }
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
          <motion.div key={fieldItem.id} className="flex gap-2 rounded-lg border p-4 py-4">
            <div className="flex flex-col justify-between gap-2 rounded-md bg-gray-100 px-1 py-2">
              <div className="flex flex-col gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => handleDuplicate(index)} type="button" className="grid place-items-center">
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
                      <button onClick={() => handleRemove(index)} type="button" className="grid place-items-center">
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
                          form.setValue(`links.${index}.isShow`, !values.links[index].isShow);
                        }}
                        type="button"
                        className="grid place-items-center"
                      >
                        {values.links[index].isShow ? <IconEye /> : <IconEyeHide />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{values.links[index].isShow ? '隱藏欄位' : '顯示欄位'}</p>
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
              className={cn('flex flex-1 flex-col gap-4', {
                'opacity-50': !values.links[index].isShow
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
                        'flex w-full items-center overflow-hidden p-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
                      )}
                    >
                      <FormLabel className="flex h-full w-14 items-center justify-center bg-gray-100">標題</FormLabel>
                      <FormControl>
                        <input placeholder="按鈕名稱" className="h-full flex-1 px-2 py-2 outline-0" {...field} />
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
                        'flex w-full items-center overflow-hidden p-0 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
                      )}
                    >
                      <FormLabel className="flex h-full w-14 items-center justify-center bg-gray-100">連結</FormLabel>
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
                          href={'/admin/analytics?key=' + fieldItem.key}
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
      <Button disabled={fields.length >= 10} type="button" onClick={() => append(defaultData.links[0])}>
        新增連結
      </Button>
    </>
  );
}
