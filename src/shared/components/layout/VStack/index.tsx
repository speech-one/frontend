'use client';

import { Stack, StackProps } from '../Stack';

export function VStack(props: Omit<StackProps, 'direction'>) {
  return (
    <Stack
      direction='vertical'
      {...props}
    />
  );
}

export * from './animated';

