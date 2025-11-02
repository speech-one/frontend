'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { setGlobalPanelState } from './overlay';

interface PanelState {
  isOpen:     boolean;
  children:   ReactNode | null;
  width?:     string | number;
  side?:      'left' | 'right';
  className?: string;
  onClose?:   () => void;
}

interface PanelContextValue {
  panelState: PanelState;
  openPanel:  (state: Omit<PanelState, 'isOpen'>) => void;
  closePanel: () => void;
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined);

export function PanelProvider({ children }: {
  children: ReactNode;
}) {
  const [panelState, setPanelState] = useState<PanelState>({
    isOpen:   false,
    children: null,
  });

  const openPanel = (state: Omit<PanelState, 'isOpen'>) => {
    setPanelState({
      ...state,
      isOpen: true,
    });
  };

  const closePanel = () => {
    if (panelState.onClose) {
      panelState.onClose();
    }

    setPanelState({
      isOpen:   false,
      children: null,
    });
  };

  // 전역 상태 설정
  useEffect(() => {
    setGlobalPanelState({
      openPanel,
      closePanel,
    });

    return () => {
      setGlobalPanelState(null);
    };
  }, []);

  return (
    <PanelContext.Provider value={{
      panelState, openPanel, closePanel,
    }}>
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);

  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }

  return context;
}

