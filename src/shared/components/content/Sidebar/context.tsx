'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

interface SidebarContextValue {
  isOpen:     boolean;
  toggleOpen: () => void;
  setOpen:    (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);  const toggleOpen = () => setIsOpen(prev => !prev);
  const setOpen = (open: boolean) => setIsOpen(open);

  return (
    <SidebarContext.Provider value={{
      isOpen, toggleOpen, setOpen,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

