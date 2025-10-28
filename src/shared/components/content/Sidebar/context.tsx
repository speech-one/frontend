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
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored !== null) {
        setIsOpen(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load sidebar state:', error);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isOpen));
    }
  }, [isOpen, mounted]);

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

