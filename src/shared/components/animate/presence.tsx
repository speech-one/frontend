import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion';
import { cn } from '@/shared/utils';

export type AnimatedPresenceType = boolean | TargetAndTransition | VariantLabels | undefined;

interface AnimatedPresenceProps {
  isOpen:      boolean;
  children:    React.ReactNode;
  initial?:    AnimatedPresenceType;
  animate?:    AnimatedPresenceType;
  exit?:       TargetAndTransition | VariantLabels | undefined;
  transition?: Transition;
  className?:  string;
  fullWidth?:  boolean;
  fullHeight?: boolean;
}

export function AnimatedPresence(props: AnimatedPresenceProps) {
  const {
    isOpen,
    children,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    exit = { opacity: 0 },
    transition = {
      duration: 0.2,
      ease:     'easeOut',
    },
    className,
    fullWidth = false,
    fullHeight = false,
  } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className={cn(
            fullWidth ? 'w-full' : 'w-fit',
            fullHeight ? 'h-full' : 'h-fit',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
