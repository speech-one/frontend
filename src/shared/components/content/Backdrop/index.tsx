'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface BackdropProps {
  children?:  ReactNode;
  onClick?:   () => void;
  className?: string;
  blur?:      boolean;
}

export function Backdrop(props: BackdropProps) {
  const {
    children,
    onClick,
    className = '',
    blur = true,
  } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease:     'easeInOut',
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-grayscale-900/80 ${
        blur ? 'backdrop-blur-sm' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

