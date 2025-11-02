'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { cn } from '@/shared/utils';
import { usePanel } from './context';

export function Panel() {
  const { panelState } = usePanel();

  const {
    isOpen,
    children,
    width = 400,
    side = 'right',
    className,
  } = panelState;

  // width가 문자열인 경우 (예: '40%') 그대로 사용, 숫자인 경우 픽셀 값으로 사용
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const isPercentage = typeof width === 'string' && width.endsWith('%');

  const contentKey = useMemo(() => {
    if (!children) {
      return null;
    }

    return `${side}-${width}-${Date.now()}`;
  }, [
    children,
    side,
    width,
  ]);

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          key={`panel-${side}`}
          initial={{
            width:   isPercentage ? '0%' : 0,
            opacity: 0,
          }}
          animate={{
            width:   widthStyle,
            opacity: 1,
          }}
          exit={{
            width:   isPercentage ? '0%' : 0,
            opacity: 0,
          }}
          transition={{
            width: {
              duration: 0.25,
              ease:     [
                0.4,
                0,
                0.2,
                1,
              ],
            },
            opacity: {
              duration: 0.2,
              ease:     'easeOut',
            },
          }}
          className={cn('h-full overflow-hidden', 'bg-grayscale-800', side === 'right' ? 'border-l border-l-grayscale-600' : 'border-r border-r-grayscale-600', className)}
        >
          <AnimatePresence mode='wait'>
            {children && (
              <motion.div
                key={contentKey}
                initial={{
                  opacity: 0,
                  x:       side === 'right' ? 20 : -20,
                }}
                animate={{
                  opacity: 1,
                  x:       0,
                }}
                exit={{
                  opacity: 0,
                  x:       side === 'right' ? -20 : 20,
                }}
                transition={{
                  duration: 0.15,
                  ease:     [
                    0.4,
                    0,
                    0.2,
                    1,
                  ],
                }}
                className='h-full w-full'
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export * from './context';
export * from './overlay';

