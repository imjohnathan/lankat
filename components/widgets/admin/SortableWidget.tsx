'use client';
import type { OptionalWidgets } from '@/components/widgets/admin/Dnd';
import EditUI from '@/components/widgets/admin/EditUI';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconLoading from '~icons/line-md/loading-twotone-loop';

interface SortableItemProps {
  render: any;
  handleDeleteWidget: (id: string) => void;
  handleToggleWidgetShow: (id: string, value: boolean) => void;
  widget: OptionalWidgets;
  isLoading?: boolean;
  id: string;
}

export default function SortableItem({
  render,
  handleDeleteWidget,
  handleToggleWidgetShow,
  widget,
  isLoading = false,
  ...props
}: SortableItemProps) {
  const { id } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };
  const Component = render;
  return (
    <div ref={setNodeRef} style={style} className={cn('relative flex', { 'animate-pulse': isLoading })}>
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
            'absolute inset-0 z-10 hidden place-items-center bg-white/80  transition-opacity duration-200',
            { '!grid': isLoading }
          )}
        >
          <IconLoading className="h-8 w-8" />
        </div>
        <div className="py-4">
          <Component widget={widget} isPreview isDraggableArea />
        </div>
      </EditUI>
    </div>
  );
}
