'use client';

import { overlay } from 'overlay-kit';
import { type ReactNode } from 'react';
import { Modal } from '.';

interface OpenModalOptions {
  children:   ReactNode;
  size?:      string;
  className?: string;
}

export function openModal(options: OpenModalOptions) {
  return new Promise<void>(resolve => {
    overlay.open(({ isOpen, close }) => {
      const handleClose = () => {
        close();

        resolve();
      };

      return (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          size={options.size}
          className={options.className}
        >
          {options.children}
        </Modal>
      );
    });
  });
}

