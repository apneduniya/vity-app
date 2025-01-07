'use client';

import { Suspense } from 'react';

import RefreshContent from '@/components/page/refresh/content';

export default function RefreshPage() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <RefreshContent />
    </Suspense>
  );
}
