import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { renderers } from "./page.client";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return (
        <div className="h-7 w-full bg-slate-300 p-6 opacity-40">spacer</div>
      );
    };
  }
  return () => <Button>{type}</Button>;
  //return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} />
    </div>
  );
}

export default function Canvas(props) {
  const { fields, className } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDroppable({
      id: "canvas_droppable",
      data: {
        parent: null,
        isContainer: true,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col gap-2">
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
}
