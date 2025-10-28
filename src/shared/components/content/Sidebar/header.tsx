'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { useSidebar } from './context';

export function SidebarHeader() {
  const { toggleOpen, isOpen } = useSidebar();

  return (
    <VStack spacing={6} fullWidth>
      <HStack fullWidth justify={isOpen ? 'between' : 'center'} padding={[10, 8]} className='overflow-hidden'>
        <motion.div
          animate={{
            opacity: isOpen ? 1 : 0,
            width:   isOpen ? 120 : 0,
          }}
          transition={{
            duration: 0.3,
            ease:     'easeInOut',
          }}
          className='overflow-hidden whitespace-nowrap select-none'
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <Link href='/'>
            <Typography.Body>SpeechOne</Typography.Body>
          </Link>
        </motion.div>
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
