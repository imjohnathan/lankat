import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import IconDrag from "~icons/mingcute/dots-fill";
import IconEdit from "~icons/solar/pen-new-square-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";

export default function WidgetUI({
  children,
  listeners,
  attributes,
  handleDeleteWidget,
  handleToggleWidgetShow,
  ...props
}) {
  const { openEditModal } = useModalStore();
  const { id, isShow, type, widget } = props;
  return (
    <Card className="w-full">
      <div className="flex flex-row justify-between p-2">
        <div className="flex items-center justify-center gap-2">
          <button className="cursor-grab px-2" {...listeners} {...attributes}>
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
            onClick={() => openEditModal({ type, widget })}
            className="text-slate-400 hover:text-black"
          >
            <IconEdit />
          </button>
          <button
            onClick={() => handleDeleteWidget(id)}
            className="text-slate-400 hover:text-red-500"
          >
            <IconDelete />
          </button>
        </div>
      </div>
      <CardContent
        className={cn({
          "opacity-50": !isShow,
        })}
      >
        {children}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
