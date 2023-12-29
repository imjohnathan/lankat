import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import useModalStore from '@/stores/useModalStore';
import IconDrag from '~icons/mingcute/dots-fill';
import IconEdit from '~icons/solar/pen-new-square-outline';
import IconDelete from '~icons/solar/trash-bin-minimalistic-outline';

export default function WidgetUI({
  children,
  listeners,
  attributes,
  handleDeleteWidget,
  handleToggleWidgetShow,
  ...props
}: {
  children: React.ReactNode;
  listeners: any;
  attributes: any;
  handleDeleteWidget: any;
  handleToggleWidgetShow: any;
  id: string;
  isShow?: boolean;
  type?: string;
  widget: any;
}) {
  const { openEditModal } = useModalStore();
  const { id, isShow, type, widget } = props;
  return (
    <Card className="w-full">
      <div className="flex flex-row justify-between p-2">
        <div className="flex items-center justify-center gap-2">
          <button className="cursor-grab touch-none px-2" {...listeners} {...attributes}>
            <IconDrag />
          </button>
          <Switch
            checked={isShow}
            onCheckedChange={(checked) => handleToggleWidgetShow(id, checked)}
            className="scale-75"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => openEditModal({ type, widget, className: '<sm:max-h-[calc(100%-4rem)] <sm:h-full' })}
            className="flex items-center gap-1 text-slate-400 hover:text-black"
          >
            <span className="text-sm">編輯</span> <IconEdit />
          </button>
          <button onClick={() => handleDeleteWidget(id)} className="text-slate-400 hover:text-red-500">
            <IconDelete />
          </button>
        </div>
      </div>
      <CardContent
        className={cn({
          'opacity-50': !isShow
        })}
      >
        {children}
      </CardContent>
    </Card>
  );
}
