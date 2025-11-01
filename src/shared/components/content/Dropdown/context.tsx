import { createContext, useContext } from 'react';

interface DropdownContextValue {
  isOpen:     boolean;
  setIsOpen:  (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  position:    {
    top: number; left: number; width: number; direction: 'up' | 'down';
  } | null;
  setPosition: (position: {
    top: number; left: number; width: number; direction: 'up' | 'down';
  } | null) => void;
}

export const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown');
  }

  return context;
}
