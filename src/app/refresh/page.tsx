'use client';

import { Suspense } from 'react';

import RefreshContent from '@/components/page/refresh/content';
import Loading from '@/components/loading';

export default function RefreshPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RefreshContent />
    </Suspense>
  );
}
