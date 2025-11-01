'use client';

import { type ReactNode, useState } from 'react';
import { VStack } from '@/shared/components/layout';
import { CollapseContext } from './context';

interface CollapseProps {
  children:     ReactNode;
  defaultOpen?: boolean;
}

export function Collapse({ children, defaultOpen = false }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <CollapseContext.Provider value={{
      isOpen,
      toggle,
    }}>
      <VStack spacing={8}>
        {children}
      </VStack>
    </CollapseContext.Provider>
  );
}

export * from './action';
export * from './content';
export * from './context';

