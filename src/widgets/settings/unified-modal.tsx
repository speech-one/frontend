'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Backdrop } from '@/shared/components/content';
import { useSettingsRouter } from './hash-router';
import { SettingsWidget } from './index';

export function SettingsUnifiedModal() {
  const { isModalOpen, closeModal } = useSettingsRouter();

  return (
    <AnimatePresence mode='wait'>
      {isModalOpen && (
        <Backdrop onClick={closeModal}>
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
            className='w-full max-w-6xl'
          >
            <SettingsWidget />
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

