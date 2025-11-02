'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';
import { PanelProvider } from '@/shared/components/content';
import { queryClient } from '@/shared/lib/react-query/client';
import { SettingsHashRouter } from '@/widgets/settings/hash-router';
import { ToastProvider } from './toast-provider';

export function Providers({ children }: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <PanelProvider>
          <SettingsHashRouter>
            {children}
            <ToastProvider />
          </SettingsHashRouter>
        </PanelProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
}

