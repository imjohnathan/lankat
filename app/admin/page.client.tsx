"use client";
import { Button } from "@/components/ui/button";
import { DndContext, DragOverlay, useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { gql, useMutation } from "@urql/next";
import { produce } from "immer";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Canvas, { Field } from "./canvas";

export const fields = [
  {
    type: "input",
    title: "Text Input",
  },
  {
    type: "select",
    title: "Select",
  },
  {
    type: "text",
    title: "Text",
  },
  {
    type: "button",
    title: "Button",
  },
  {
    type: "textarea",
    title: "Text Area",
  },
];

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

function SidebarField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return <Button className={className}>{title}</Button>;
}

function Draggable(props) {
  const { field, ...rest } = props;
  const id = useRef(uuidv4());
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function App() {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now(),
  );
  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeSidebarField, setActiveSidebarField] = useState(); // only for fields from the sidebar
  const [activeField, setActiveField] = useState(); // only for fields that are in the form.
  const [data, updateData] = useState({
    fields: [],
  });
  const { fields: dataFields } = data;

  const getWidgetIdQuery = gql`
    mutation GetWidgetId(
      $object: widgets_insert_input = {}
      $on_conflict: widgets_on_conflict!
    ) {
      insert_widgets_one(object: $object, on_conflict: $on_conflict) {
        id
      }
    }
  `;
  const [insertWidgetResult, insertWidget] = useMutation(getWidgetIdQuery);

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          <div
            className={"flex flex-col gap-2 p-6"}
            key={sidebarFieldsRegenKey}
          >
            {fields.map((f) => (
              <Draggable key={f.type} field={f} />
            ))}
          </div>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={dataFields.map((f) => f.id)}
          >
            <Canvas
              className={"h-[90vh] w-full flex-1 border-2 border-dashed p-6"}
              fields={dataFields}
            />
          </SortableContext>
          <DragOverlay>
            {activeSidebarField ? (
              <SidebarField overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
      {JSON.stringify(data, null, 2)}
    </>
  );

  function cleanUp() {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  }

  function handleDragStart(event) {
    const { active } = event;
    const activeData = getData(active);

    if (activeData?.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      //設定activeField 主要讓他透明化
      setActiveSidebarField(field);
      //先把要新增到列表的field儲存起來，因為等一下會先用一個假的field來佔位
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}`,
        parent: null,
      };
      return;
    }

    //這邊是給已經在列表裡面的field用的，移動順序
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData(
      produce((draft) => {
        draft.fields.splice(index, 1, createSpacer({ id: active.id }));
      }),
    );
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData(
          produce((draft) => {
            if (!draft.fields.length) {
              draft.fields.push(spacer);
            } else {
              const nextIndex =
                overData.index > -1 ? overData.index : draft.fields.length;

              draft.fields.splice(nextIndex, 0, spacer);
            }
            spacerInsertedRef.current = true;
          }),
        );
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData(
          produce((draft) => {
            draft.fields = draft.fields.filter((f) => f.type !== "spacer");
          }),
        );
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData(
          produce((draft) => {
            const spacerIndex = draft.fields.findIndex(
              (f) => f.id === active.id + "-spacer",
            );

            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length - 1;

            if (nextIndex === spacerIndex) {
              return;
            }

            draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
          }),
        );
      }
    }
  }

  async function handleDragEnd(event) {
    const { over, active } = event;
    const activeData = getData(active);

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData(
        produce((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        }),
      );
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);
      console.log("overData", overData, "nextField", nextField);

      try {
        const variables = {
          object: {
            type: nextField.type,
            name: nextField.name,
            sort: overData.index || 0,
          },
          on_conflict: {
            constraint: "widgets_pkey",
            where: { id: { _eq: nextField.id } },
            update_columns: "sort",
          },
        };
        const { data, error } = await insertWidget(variables);

        if (error) {
          throw new Error(error);
        }

        nextField = { ...nextField, id: data.insert_widgets_one.id };
      } catch (e) {
        console.error("Error updating database:", e);
        // 可以在这里处理错误，如回退状态或显示错误消息
        return; // 阻止进一步执行，因为数据库操作失败
      }

      updateData(
        produce((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.type === "spacer",
          );
          draft.fields.splice(spacerIndex, 1, nextField);

          draft.fields = arrayMove(
            draft.fields,
            spacerIndex,
            overData.index || 0,
          ).map((field, index) => ({ ...field, sort: index }));
        }),
      );
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  }
}
