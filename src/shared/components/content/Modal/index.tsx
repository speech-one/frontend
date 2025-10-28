'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/shared/utils';
import { Backdrop } from '../Backdrop';

interface ModalProps {
  isOpen:     boolean;
  onClose:    () => void;
  children:   ReactNode;
  className?: string;
  size?:      string;
}

const sizeMap: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Modal(props: ModalProps) {
  const {
    isOpen,
    onClose,
    children,
    className,
    size = 'md',
  } = props;

  const sizeClass = sizeMap[size];
  const customStyle = !sizeClass ? { maxWidth: size } : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={onClose}>
          <motion.div
            initial={{
              opacity: 0,
              scale:   0.95,
              y:       20,
            }}
            animate={{
              opacity: 1,
              scale:   1,
              y:       0,
            }}
            exit={{
              opacity: 0,
              scale:   0.95,
              y:       20,
            }}
            transition={{
              duration: 0.2,
              ease:     'easeOut',
            }}
            onClick={e => e.stopPropagation()}
            className={cn('w-full',
              sizeClass,
              className)}
            style={customStyle}
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

