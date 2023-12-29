'use client';
import LoadingFallback from '@/components/ui/loading-fallback';
import AddWidgets from '@/components/widgets/admin/AddWidgets';
import SortableItem from '@/components/widgets/admin/SortableWidget';
import { type MakeOptional, type Widgets } from '@/gql/graphql';
import { widgetsList } from '@/lib/constants/widgets';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { gql, useMutation, useQuery } from '@urql/next';
import { produce } from 'immer';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import PhArrowBendRightUp from '~icons/ph/arrow-bend-right-up';
import Preview from './Preview';
import PreviewMobile from './PreviewMobile';

export type OptionalWidgets = MakeOptional<
  Widgets,
  'created_at' | 'pages_widgets' | 'pages_widgets_aggregate' | 'widgets_links' | 'widgets_links_aggregate'
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
      config
      widgets_links(order_by: { sort: asc_nulls_first }) {
        id
        isShow
        name
        link {
          id
          url
          clicks
          key
          image
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

export default function DnD() {
  const { data: session } = useSession();
  const [insertWidgetResult, insertWidget] = useMutation(insertWidgetQuery);
  const [updateWidgetsResult, updateWidgets] = useMutation(updateWidgetsQuery);
  const [deleteWidgetResult, deleteWidget] = useMutation(deleteWidgetQuery);
  const [widgets, setWidgets] = useState<OptionalWidgets[]>([]);
  const previousWidgetsRef = useRef<OptionalWidgets[]>([]);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getWidgetsQuery
  });
  const isFetching =
    fetching || insertWidgetResult.fetching || updateWidgetsResult.fetching || deleteWidgetResult.fetching;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleAddWidget = async (type: string) => {
    try {
      const variables = {
        object: {
          type,
          sort: -1
        }
      };
      const { data, error } = await insertWidget(variables);

      if (error) {
        throw new Error(error.message);
      }

      const widget = {
        id: data.insert_widgets_one.id,
        type,
        isShow: true,
        widgets_links: []
      };

      setWidgets(
        produce((draftWidgets) => {
          draftWidgets.unshift(widget);
        })
      );
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
      setWidgets((items) => items.filter((item) => item.id !== id));
      if (error) {
        throw new Error(error.message);
      }
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
  };

  const handleToggleWidgetShow = async (id: string, value: boolean) => {
    try {
      const updates = [
        {
          where: { id: { _eq: id } },
          _set: { isShow: value }
        }
      ];
      const { data, error } = await updateWidgets({ updates });

      if (error) {
        throw new Error(error.message);
      }
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
  };

  useEffect(() => {
    const updateWidgetsSort = async () => {
      try {
        const updates = widgets.map(({ id }, index) => ({
          where: { id: { _eq: id } },
          _set: { sort: index }
        }));
        const { data, error } = await updateWidgets({ updates });
        if (error) throw new Error(error.message);
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

  useEffect(() => {
    if (data?.widgets.length === 0 && widgets.length > 0) {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }
  }, [data, widgets, reexecuteQuery]);

  if (fetching) return <LoadingFallback />;

  return (
    <div className="container my-20 max-w-4xl">
      <PreviewMobile session={session} />
      <div className="grid sm:grid-cols-2">
        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-center">
            <AddWidgets handleAddWidget={handleAddWidget} />
          </div>
          <div className="flex w-full sm:w-[350px] flex-col justify-center gap-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={widgets.map((widget) => widget.id)} strategy={verticalListSortingStrategy}>
                {widgets.map((widget) => {
                  const { type, id } = widget;
                  const component = widgetsList.find((w) => w.type === type)?.render;
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
                {widgets.length === 0 && (
                  <div className="grid place-items-center text-gray-800">
                    <div className="mt-8 flex">
                      <div className="flex items-end pb-1 text-xl font-medium">開始新增小工具</div>
                      <PhArrowBendRightUp className="ml-[-12px] h-32 w-32" />
                    </div>
                  </div>
                )}
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <div className="relative <sm:hidden">
          <div className="sticky top-12 grid place-items-center">
            <Preview session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
