import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion';

export type AnimatedPresenceType = boolean | TargetAndTransition | VariantLabels | undefined;

interface AnimatedPresenceProps {
  isOpen:      boolean;
  children:    React.ReactNode;
  initial?:    AnimatedPresenceType;
  animate?:    AnimatedPresenceType;
  exit?:       TargetAndTransition | VariantLabels | undefined;
  transition?: Transition;
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
  } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
