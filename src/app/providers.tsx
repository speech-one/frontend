'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';
import { queryClient } from '@/shared/lib/react-query/client';
import { SettingsHashRouter } from '@/widgets/settings/hash-router';
import { ToastProvider } from './toast-provider';

export function Providers({ children }: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <SettingsHashRouter>
          {children}
          <ToastProvider />
        </SettingsHashRouter>
      </OverlayProvider>
    </QueryClientProvider>
  );
}

