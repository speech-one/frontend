'use client';

import { Stack, StackProps } from '../Stack';

export function HStack(props: Omit<StackProps, 'direction'>) {
  return (
    <Stack
      direction='horizontal'
      {...props}
    />
  );
}

export * from './animated';

