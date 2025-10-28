'use client';

import { OverlayProvider } from 'overlay-kit';
import { type ReactNode } from 'react';
import { SettingsHashRouter } from '@/widgets/settings/hash-router';

export function Providers({ children }: {
  children: ReactNode;
}) {
  return (
    <OverlayProvider>
      <SettingsHashRouter>
        {children}
      </SettingsHashRouter>
    </OverlayProvider>
  );
}

