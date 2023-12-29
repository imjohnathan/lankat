import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ColorForm, RadioForm, SliderForm } from '@/components/ui/form/form-elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import FooterButton from '@/components/widgets/modals/FooterButtons';
import Preview from '@/components/widgets/preview/Separator';
import type { Widgets } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import useModalStore from '@/stores/useModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@urql/next';
import { useEffect, useId, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const mutation = gql`
  mutation UpdatedWidget($config: jsonb!, $id: uuid!) {
    update_widgets_by_pk(_set: { config: $config }, pk_columns: { id: $id }) {
      id
    }
  }
`;

const separatorStyles = [
  {
    label: '實線',
    value: 'solid'
  },
  {
    label: '虛線',
    value: 'dashed'
  },
  {
    label: '點線',
    value: 'dotted'
  },
  {
    label: '雙線',
    value: 'double'
  }
];

const separatorValues = separatorStyles.map(({ value }) => value);

const FormSchema = z.object({
  style: z.enum(separatorValues as [string, ...string[]], {
    required_error: '請選擇一個樣式'
  }),
  width: z.number().min(1).max(20).default(2),
  color: z.string().default('#000000'),
  marginTop: z.number().min(0).max(100).default(0),
  marginBottom: z.number().min(0).max(100).default(0),
  widthValue: z.number().min(1).max(100).default(80)
});

export default function Separator({ widget }: { widget: Widgets }) {
  const { close, setUnSavedChanges } = useModalStore();
  const formId = useId();
  const [isPreview, setIsPreview] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: widget.config?.style || 'solid',
      width: widget.config?.width || 2,
      color: widget.config?.color || '#000000',
      marginTop: widget.config?.marginTop || 0,
      marginBottom: widget.config?.marginBottom || 0,
      widthValue: widget.config?.widthValue || 80
    }
  });
  const [{ fetching, error }, updateWidget] = useMutation(mutation);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { error } = await updateWidget({
        id: widget.id,
        config: data
      });
      if (error) throw new Error(error.message);
      toast.success('已儲存成功！');
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
    }
  }
  const config = form.watch() as {
    style: 'solid' | 'dashed' | 'dotted' | 'double';
    width: number;
    color: string;
    marginTop: number;
    marginBottom: number;
    widthValue: number;
  };

  const { isDirty } = useFormState({
    control: form.control
  });

  useEffect(() => {
    if (isDirty) setUnSavedChanges(true);
  }, [isDirty, setUnSavedChanges]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>分隔線</DialogTitle>
      </DialogHeader>
      <div className="flex flex-1">
        <ScrollArea className={cn('sm:max-h-[500px] flex-1 sm:px-4', { hidden: isPreview })}>
          <Form {...form}>
            <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <RadioForm<z.infer<typeof FormSchema>> form={form} label="樣式" name="style" items={separatorStyles} />
              <SliderForm
                form={form}
                label="粗細"
                name="width"
                max={20}
                min={1}
                step={1}
                unit={'px'}
                classNames="h-auto py-2"
              />
              <ColorForm<z.infer<typeof FormSchema>> form={form} label="顏色" name="color" />
              <SliderForm<z.infer<typeof FormSchema>>
                form={form}
                label="上間距"
                name="marginTop"
                max={100}
                min={0}
                step={1}
                unit={'px'}
                classNames="h-auto py-2"
              />
              <SliderForm<z.infer<typeof FormSchema>>
                form={form}
                label="下間距"
                name="marginBottom"
                max={100}
                min={0}
                step={1}
                unit={'px'}
                classNames="h-auto py-2"
              />
              <SliderForm<z.infer<typeof FormSchema>>
                form={form}
                label="寬度"
                name="widthValue"
                max={100}
                min={1}
                step={1}
                unit={'%'}
                classNames="h-auto py-2"
              />
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
          <Preview isPreview config={config} />
        </div>
      </div>
      <DialogFooter className="<sm:flex-row gap-3">
        <FooterButton setIsPreview={setIsPreview} isPreview={isPreview} isFetching={fetching} formId={formId} />
      </DialogFooter>
    </>
  );
}
