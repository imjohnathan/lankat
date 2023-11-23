import { Card } from "@/components/ui/card";
import { classes } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import IconDrag from "~icons/mingcute/dots-fill";
import IconFolder from "~icons/solar/add-folder-bold";
import IconCopy from "~icons/solar/copy-outline";
import IconEyeHide from "~icons/solar/eye-line-duotone";
import IconEye from "~icons/solar/eye-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";
import { type WidgetLink } from "./";

export default function Field({
  index,
  field,
  handleFieldChange,
  handleDeleteField,
  handleCopyField,
  handleShowField,
}: {
  index: number;
  field: Partial<WidgetLink>;
  handleFieldChange: (index: number, field: Partial<WidgetLink>) => void;
  handleDeleteField: (index: number) => void;
  handleCopyField: (index: number) => void;
  handleShowField: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: field.dragId || index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Card ref={setNodeRef} style={style} className="flex gap-2 p-4 py-4">
      <div className="flex flex-col gap-2 rounded-md bg-gray-100 px-1 py-2">
        <button
          onClick={() => handleCopyField(index)}
          className="grid place-items-center"
        >
          <IconCopy />
        </button>
        <button
          onClick={() => handleDeleteField(index)}
          className="grid place-items-center"
        >
          <IconDelete />
        </button>
        <button
          onClick={() => handleShowField(index)}
          className="grid place-items-center"
        >
          {field.isShow ? <IconEye /> : <IconEyeHide />}
        </button>
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="grid place-items-center"
        >
          <IconDrag />
        </button>
      </div>
      <div
        className={clsx("grid flex-1 gap-4", { "opacity-50": !field.isShow })}
      >
        <div
          className={cn(
            classes,
            "flex items-center justify-center overflow-hidden p-0",
          )}
        >
          <div className="flex h-full items-center justify-center bg-gray-100 px-4">
            文字
          </div>
          <input
            type="text"
            id="name"
            className="h-full flex-1 px-4 py-2 outline-0"
            value={field.name}
            onChange={(e) => handleFieldChange(index, { name: e.target.value })}
          />
        </div>
        <div
          className={cn(
            classes,
            "flex items-center justify-center overflow-hidden p-0",
          )}
        >
          <div className="flex h-full items-center justify-center bg-gray-100 px-4">
            連結
          </div>
          <input
            type="text"
            id="name"
            className="h-full flex-1 px-4 py-2 outline-0"
            value={field.url}
            onChange={(e) => handleFieldChange(index, { url: e.target.value })}
          />
          <button
            type="button"
            className="mr-2 grid place-items-center text-lg"
          >
            <IconFolder />
          </button>
        </div>
      </div>
    </Card>
  );
}
