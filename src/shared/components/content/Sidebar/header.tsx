'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { useSidebar } from './context';

export function SidebarHeader() {
  const { toggleOpen, isOpen } = useSidebar();

  return (
    <VStack spacing={6} fullWidth>
      <HStack fullWidth justify={isOpen ? 'between' : 'center'} className='px-[8px] py-[10px]'>
        <AnimatePresence>
          {
            isOpen && (
              <motion.div
                initial={{
                  opacity: 0, x: -10,
                }}
                animate={{
                  opacity: 1, x: 0,
                }}
                exit={{
                  opacity: 0, x: -10,
                }}
                transition={{ duration: 0.2 }}
              >
                <Typography.Body>SpeechOne</Typography.Body>
              </motion.div>
            )
          }
        </AnimatePresence>
        <IconButton icon={isOpen ? 'panel-left-close' : 'panel-left-open'} onClick={toggleOpen} />
      </HStack>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0, height: 0,
            }}
            animate={{
              opacity: 1, height: 'auto',
            }}
            exit={{
              opacity: 0, height: 0,
            }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%' }}
          >
            <Divider />
          </motion.div>
        )}
      </AnimatePresence>
    </VStack>
  );
}
