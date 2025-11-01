import { createContext, useContext } from 'react';

interface CollapseContextValue {
  isOpen:    boolean;
  toggle:    () => void;
}

export const CollapseContext = createContext<CollapseContextValue | undefined>(undefined);

export function useCollapse() {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error('Collapse components must be used within Collapse');
  }

  return context;
}

