'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface SidebarContextValue {
  isOpen:     boolean;
  toggleOpen: () => void;
  setOpen:    (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);
const STORAGE_KEY = 'sidebar-open';

export function SidebarProvider({ children }: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return true;

    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleOpen = () => setIsOpen((prev: boolean) => !prev);
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

