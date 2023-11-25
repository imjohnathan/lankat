"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

const initialTools = [
  { type: "input", title: "Text Input" },
  { type: "select", title: "Select" },
  // ...其他工具
];

function MyBuilder() {
  const [tools, setTools] = useState(initialTools);
  const [selectedTools, setSelectedTools] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedTools((items) => {
        const oldIndex = items.findIndex((item) => item.type === active.id);
        const newIndex = items.findIndex((item) => item.type === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div>
        <div>工具列表：</div>
        {tools.map((tool) => (
          <DraggableItem key={tool.type} id={tool.type} data={tool} />
        ))}
      </div>
      <DroppableArea selectedTools={selectedTools} />
    </DndContext>
  );
}

function DraggableItem({ id, data }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {data.title}
    </div>
  );
}

function DroppableArea({ selectedTools }) {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div ref={setNodeRef}>
      <SortableContext
        items={selectedTools}
        strategy={verticalListSortingStrategy}
      >
        <div>可放置区域：</div>
        {selectedTools.map((tool, index) => (
          <SortableItem key={tool.type} id={tool.type} data={tool} />
        ))}
      </SortableContext>
    </div>
  );
}

function SortableItem({ id, data }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {data.title}
    </div>
  );
}

function arrayMove(arr, fromIndex, toIndex) {
  const newArr = [...arr];
  const item = newArr.splice(fromIndex, 1)[0];
  newArr.splice(toIndex, 0, item);
  return newArr;
}

export default MyBuilder;
