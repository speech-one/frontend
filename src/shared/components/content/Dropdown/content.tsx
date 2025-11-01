import { AnimatePresence, motion } from 'framer-motion';
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils';
import { useDropdown } from './context';

interface DropdownContentProps {
  children:   ReactNode;
  className?: string;
}

export function DropdownContent({ children, className }: DropdownContentProps) {
  const {
    isOpen,
    position,
    triggerRef,
    setPosition,
  } = useDropdown();

  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && position && contentRef.current && triggerRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const gap = 8;

      if (position.direction === 'down' && triggerRect.bottom + contentRect.height + gap > viewportHeight) {
        const newTop = triggerRect.top + window.scrollY - contentRect.height - gap;

        setPosition({
          ...position,
          top:       newTop,
          direction: 'up',
        });
      } else if (position.direction === 'up' && triggerRect.top - contentRect.height - gap < 0) {
        const newTop = triggerRect.bottom + window.scrollY + gap;

        setPosition({
          ...position,
          top:       newTop,
          direction: 'down',
        });
      }
    }
  }, [
    isOpen, position, setPosition,
  ]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && position && (
        <motion.div
          ref={contentRef}
          data-dropdown-content
          initial={{
            opacity: 0, scale: 0.95, y: position.direction === 'down' ? -10 : 10,
          }}
          animate={{
            opacity: 1, scale: 1, y: 0,
          }}
          exit={{
            opacity: 0, scale: 0.95, y: position.direction === 'down' ? -10 : 10,
          }}
          transition={{
            duration: 0.1, ease: 'easeOut',
          }}
          style={{
            position:  'fixed',
            top:       position.direction === 'down' ? `${position.top}px` : 'auto',
            bottom:    position.direction === 'up' ? `${window.innerHeight - position.top}px` : 'auto',
            left:      `${position.left}px`,
            transform: 'translateX(-100%)',
          }}
          className={cn('z-9999 min-w-[200px] bg-grayscale-800 border border-grayscale-600 rounded-[12px] shadow-lg overflow-hidden',
            className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
