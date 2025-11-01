import { motion } from 'framer-motion';
import {
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/shared/utils';
import { useCollapse } from './context';

interface CollapseContentProps {
  children:   ReactNode;
  className?: string;
}

export function CollapseContent({ children, className }: CollapseContentProps) {
  const { isOpen } = useCollapse();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;

      setHeight(contentHeight);
    }
  }, [isOpen, children]);

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={false}
      animate={{ height: isOpen ? height : 0 }}
      transition={{
        duration: 0.3,
        ease:     'easeInOut',
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
}

