'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          background:   'var(--color-grayscale-800)',
          color:        'var(--color-grayscale-100)',
          border:       '1px solid var(--color-grayscale-700)',
          borderRadius: '12px',
          fontSize:     '14px',
          padding:      '12px 16px',
        },
        className: 'toast',
      }}
      richColors
    />
  );
}

