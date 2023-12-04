"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import LoadingFallback from "@/components/ui/loading-fallback";
import PreviewPage from "@/components/userpage/Preview";
import EditUI from "@/components/widgets/admin/EditUI";
import BannerPreview from "@/components/widgets/preview/Banner";
import LinksPreview from "@/components/widgets/preview/Buttons";
import { type MakeOptional, type Widgets } from "@/gql/graphql";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
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
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import SolarAddCircleBold from "~icons/solar/add-circle-bold";
import SolarPenNewSquareOutline from "~icons/solar/pen-new-square-outline";

type OptionalWidgets = MakeOptional<
  Widgets,
  | "created_at"
  | "pages_widgets"
  | "pages_widgets_aggregate"
  | "widgets_links"
  | "widgets_links_aggregate"
>;

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
interface SortableItemProps {
  render: any;
  handleDeleteWidget: (id: string) => void;
  handleToggleWidgetShow: (id: string, value: boolean) => void;
  widget: OptionalWidgets;
  isLoading?: boolean;
  id: string;
}

function SortableItem({
  render,
  handleDeleteWidget,
  handleToggleWidgetShow,
  widget,
  isLoading = false,
  ...props
}: SortableItemProps) {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const Component = render;
  return (
    <div ref={setNodeRef} style={style} className="relative flex">
      <EditUI
        {...props}
        widget={widget}
        handleDeleteWidget={handleDeleteWidget}
        handleToggleWidgetShow={handleToggleWidgetShow}
        attributes={attributes}
        listeners={listeners}
      >
        <div
          className={cn(
            "absolute inset-0 hidden place-items-center bg-white/70 transition-opacity duration-200",
            { "!grid": isLoading },
          )}
        >
          <IconLoading className="h-8 w-8" />
        </div>
        <div className="py-4">
          <Component widget={widget} isPreview />
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
  const [widgets, setWidgets] = useState<OptionalWidgets[]>([]);
  const previousWidgetsRef = useRef<OptionalWidgets[]>([]);
  const isWidgetInit = useRef(false);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getWidgetsQuery,
  });
  const isFetching =
    fetching ||
    insertWidgetResult.fetching ||
    updateWidgetsResult.fetching ||
    deleteWidgetResult.fetching;
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
          //user: session?.id ?? "",
          sort: -1,
        },
      };
      const { data, error } = await insertWidget(variables);

      if (error) {
        throw new Error(error.message);
      }

      const widget = {
        id: data.insert_widgets_one.id,
        type,
        isShow: true,
        widgets_links: [],
      };

      setWidgets(
        produce((draftWidgets) => {
          draftWidgets.unshift(widget);
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id);
        const newIndex = items.findIndex(({ id }) => id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDeleteWidget = async (id: string) => {
    try {
      const variables = { id };

      const { data, error } = await deleteWidget(variables);

      if (error) {
        throw new Error(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
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
        throw new Error(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
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
        if (error) throw new Error(error.message);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          toast.error("錯誤：" + e.message);
          throw new Error(e.message);
        } else {
          console.error("An unknown error occurred");
          throw new Error("An unknown error occurred");
        }
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

  if (widgets.length === 0) return <LoadingFallback />;

  return (
    <div className="container my-20 max-w-4xl">
      <div className="grid grid-cols-2">
        <div className="grid place-items-center gap-5">
          <div className="flex gap-4">
            <Button onClick={() => handleAddWidget("links")}>
              <SolarAddCircleBold className="mr-2 h-4 w-4" />
              連結按鈕
            </Button>
            <Button onClick={() => handleAddWidget("banner")}>
              <SolarAddCircleBold className="mr-2 h-4 w-4" />
              圖片看板
            </Button>
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
                      isLoading={isFetching}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <div className="relative">
          <div className="sticky top-5 grid place-items-center">
            <PreviewPage isFloating={false} />
            <Link
              href="/admin/setting"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mt-[-111px]",
              )}
            >
              <SolarPenNewSquareOutline className="mr-2 h-4 w-4" /> 編輯個人檔案
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DnD />
    </Suspense>
  );
}
