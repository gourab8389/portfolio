'use client';

import { useState, useCallback } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { InitialLoader } from '@/components/ui/InitialLoader';

export function InitialLoaderWrapper() {
  const { isLoading } = usePortfolio();
  const [done, setDone] = useState(false);

  return (
    <InitialLoader
      isLoading={isLoading}
      onComplete={() => setDone(true)}
    />
  );
}