'use client';
import { Loading } from '@/components/Modal';
import { Widgets } from '@/gql/graphql';
import { lazy, Suspense } from 'react';

interface WidgetEditModalProps {
  id: string;
  type: keyof typeof modals;
  widget: Widgets;
  open: boolean;
}

const modals = {
  links: lazy(() => import('@/components/widgets/modals/ButtonEdit')),
  separator: lazy(() => import('@/components/widgets/modals/Separator')),
  banner: lazy(() => import('@/components/widgets/modals/Banner')),
  text: lazy(() => import('@/components/widgets/modals/Text'))
};

export default function WidgetEditModal({ type, widget, ...props }: WidgetEditModalProps) {
  const Modal = modals[type];
  return (
    <Suspense
      fallback={
        <div className="h-[300px]">
          <Loading />
        </div>
      }
    >
      {type && <Modal widget={widget} {...props} />}
    </Suspense>
  );
}
