'use client';

import { type ReactNode } from 'react';
import { usePanel } from './context';

interface OpenPanelOptions {
  children:   ReactNode;
  width?:     string | number;
  side?:      'left' | 'right';
  className?: string;
}

type PanelRenderer = (props: {
  isOpen: boolean;
  close:  () => void;
}) => ReactNode;

interface PanelRendererOptions {
  width?:     string | number;
  side?:      'left' | 'right';
  className?: string;
}

// PanelProvider 내부에서만 사용할 수 있는 openPanel
export function useOpenPanel() {
  const { openPanel: openPanelState, closePanel } = usePanel();

  const openPanel = (optionsOrRenderer: OpenPanelOptions | PanelRenderer): Promise<void> => {
    return new Promise<void>(resolve => {
      closePanel();

      const handleClose = () => {
        closePanel();

        resolve();
      };

      if (typeof optionsOrRenderer === 'function') {
        const children = optionsOrRenderer({
          isOpen: true,
          close:  handleClose,
        });

        openPanelState({
          children,
          onClose: handleClose,
        });

        return;
      }

      openPanelState({
        children:  optionsOrRenderer.children,
        width:     optionsOrRenderer.width,
        side:      optionsOrRenderer.side,
        className: optionsOrRenderer.className,
        onClose:   handleClose,
      });
    });
  };

  return openPanel;
}

/* 전역으로 사용할 수 있는 panel 객체 */
let globalPanelState: {
  openPanel:  (state: Omit<Parameters<ReturnType<typeof usePanel>['openPanel']>[0], 'isOpen'>) => void;
  closePanel: () => void;
} | null = null;

export function setGlobalPanelState(state: typeof globalPanelState) {
  globalPanelState = state;
}

export function openPanel(rendererOrOptions: PanelRenderer | OpenPanelOptions, options?: PanelRendererOptions): Promise<void> {
  if (!globalPanelState) {
    throw new Error('PanelProvider is not mounted. Please wrap your app with PanelProvider.');
  }

  return new Promise<void>(resolve => {
    const state = globalPanelState!;

    state.closePanel();

    const handleClose = () => {
      state.closePanel();

      resolve();
    };

    if (typeof rendererOrOptions === 'function') {
      const children = rendererOrOptions({
        isOpen: true,
        close:  handleClose,
      });

      state.openPanel({
        children,
        width:     options?.width,
        side:      options?.side,
        className: options?.className,
        onClose:   handleClose,
      });

      return;
    }

    state.openPanel({
      children:  rendererOrOptions.children,
      width:     rendererOrOptions.width,
      side:      rendererOrOptions.side,
      className: rendererOrOptions.className,
      onClose:   handleClose,
    });
  });
}

export const panel = { open: openPanel };
