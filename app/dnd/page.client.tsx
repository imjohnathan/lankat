"use client";
import { Button } from "@/components/ui/button";
import EditUI from "@/components/widgets/admin/EditUI";
import BannerPreview from "@/components/widgets/preview/Banner";
import LinksPreview from "@/components/widgets/preview/Buttons";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { gql, useMutation, useQuery } from "@urql/next";
import { produce } from "immer";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useRef, useState } from "react";

const insertWidgetQuery = gql`
  mutation insertWidget($object: widgets_insert_input = {}) {
    insert_widgets_one(object: $object) {
      id
    }
  }
`;

const updateWidgetsQuery = gql`
  mutation updateWidgets($updates: [widgets_updates!]!) {
    update_widgets_many(updates: $updates) {
      affected_rows
      returning {
        id
        sort
      }
    }
  }
`;

const getWidgetsQuery = gql`
  query getWidgets($where: widgets_bool_exp) {
    widgets(order_by: { sort: asc_nulls_first }, where: $where) {
      id
      isShow
      name
      type
      widgets_links(order_by: { sort: asc_nulls_first }) {
        id
        isShow
        name
        link {
          id
          url
        }
      }
    }
  }
`;

const deleteWidgetQuery = gql`
  mutation DeleteWidget($id: uuid!) {
    delete_widgets_by_pk(id: $id) {
      id
    }
  }
`;

const widgetsList = [
  {
    type: "links",
    title: "Links",
    render: (props) => <LinksPreview {...props} />,
  },
  {
    type: "banner",
    title: "Banner",
    render: (props) => <BannerPreview {...props} />,
  },
  {
    type: "input",
    title: "Text Input",
    render: () => <input type="text" />,
  },
  {
    type: "select",
    title: "Select",
    render: () => <select />,
  },
  {
    type: "text",
    title: "Text",
    render: () => <p>Text</p>,
  },
  {
    type: "button",
    title: "Button",
    render: () => <Button>Button</Button>,
  },
  {
    type: "textarea",
    title: "Text Area",
    render: () => <textarea />,
  },
];

function SortableItem({
  render,
  handleDeleteWidget,
  handleToggleWidgetShow,
  widget,
  ...props
}) {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const Component = render;
  return (
    <div ref={setNodeRef} style={style} className="flex">
      <EditUI
        {...props}
        widget={widget}
        handleDeleteWidget={handleDeleteWidget}
        handleToggleWidgetShow={handleToggleWidgetShow}
        attributes={attributes}
        listeners={listeners}
      >
        <div className="py-4">
          <Component widget={widget} />
        </div>
      </EditUI>
    </div>
  );
}

function DnD() {
  const { data: session } = useSession();
  const [insertWidgetResult, insertWidget] = useMutation(insertWidgetQuery);
  const [updateWidgetsResult, updateWidgets] = useMutation(updateWidgetsQuery);
  const [deleteWidgetResult, deleteWidget] = useMutation(deleteWidgetQuery);
  const [widgets, setWidgets] = useState([]);
  const previousWidgetsRef = useRef([]);
  const isWidgetInit = useRef(false);

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getWidgetsQuery,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleAddWidget = async (type: string) => {
    try {
      const variables = {
        object: {
          type,
          user: session?.id ?? "",
          sort: -1,
        },
      };
      const { data, error } = await insertWidget(variables);

      if (error) {
        throw new Error(error);
      }

      const widget = {
        id: data.insert_widgets_one.id,
        type,
        isShow: true,
        widgets_links: [],
      };

      setWidgets(
        produce((widgets) => {
          widgets.unshift(widget);
        }),
      );
    } catch (e) {
      console.error("Error updating database:", e);
      throw new Error(e);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id);
        const newIndex = items.findIndex(({ id }) => id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteWidget = async (id: string) => {
    try {
      const variables = { id };

      const { data, error } = await deleteWidget(variables);

      if (error) {
        throw new Error(error);
      }
    } catch (e) {
      console.error("Error updating database:", e);
      throw new Error(e);
    }
  };

  const handleToggleWidgetShow = async (id: string, value: boolean) => {
    try {
      const updates = [
        {
          where: { id: { _eq: id } },
          _set: { isShow: value },
        },
      ];
      const { data, error } = await updateWidgets({ updates });

      if (error) {
        throw new Error(error);
      }
    } catch (e) {
      console.error("Error updating database:", e);
      throw new Error(e);
    }
  };

  useEffect(() => {
    const updateWidgetsSort = async () => {
      try {
        const updates = widgets.map(({ id }, index) => ({
          where: { id: { _eq: id } },
          _set: { sort: index },
        }));
        const { data, error } = await updateWidgets({ updates });
        if (error) throw new Error(error);
      } catch (e) {
        console.error("Error updating database:", e);
        throw new Error(e);
      }
    };

    if (widgets.length && previousWidgetsRef.current !== widgets) {
      updateWidgetsSort();
    }
    previousWidgetsRef.current = widgets;
  }, [widgets, updateWidgets]);

  useEffect(() => {
    if (data) {
      setWidgets(data.widgets);
      previousWidgetsRef.current = data.widgets;
    }
  }, [data]);

  return (
    <div className="mt-20 grid place-items-center gap-5">
      <div className="flex gap-4">
        <Button onClick={() => handleAddWidget("links")}>新增連結按鈕</Button>
        <Button onClick={() => handleAddWidget("banner")}>新增圖片看板</Button>
      </div>
      <div className="flex w-[350px] flex-col gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={widgets.map((widget) => widget.id)}
            strategy={verticalListSortingStrategy}
          >
            {widgets.map((widget) => {
              const { type, id } = widget;
              const component = widgetsList.find((w) => w.type === type)
                ?.render;
              return (
                <SortableItem
                  handleDeleteWidget={handleDeleteWidget}
                  handleToggleWidgetShow={handleToggleWidgetShow}
                  widget={widget}
                  {...widget}
                  render={component}
                  key={id}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
      <code className="mt-20 block max-w-sm overflow-hidden whitespace-pre">
        {JSON.stringify(widgets, null, 2)}
      </code>
    </div>
  );
}

export default function App() {
  return (
    <Suspense>
      <DnD />
    </Suspense>
  );
}
