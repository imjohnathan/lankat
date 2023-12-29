'use client';
import LoadingFallback from '@/components/ui/loading-fallback';
import DnD from '@/components/widgets/admin/Dnd';
import { Suspense } from 'react';

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DnD />
    </Suspense>
  );
}
