'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { useSidebar } from './context';

interface SidebarGroupProps {
  children: React.ReactNode;
  title:    string;
}

export function SidebarGroup(props: SidebarGroupProps) {
  const { children, title } = props;
  const { isOpen } = useSidebar();
  const storageKey = `sidebar-group-${title}`;

  const [isGroupOpen, setIsGroupOpen] = useState(() => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem(storageKey);

    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isGroupOpen));
  }, [isGroupOpen, storageKey]);

  return (
    <VStack spacing={6} fullWidth>
      <AnimatePresence>
        {
          isOpen && (
            <motion.div initial={{
              opacity: 0, height: 0,
            }} animate={{
              opacity: 1, height: 'auto',
            }} exit={{
              opacity: 0, height: 0,
            }} transition={{ duration: 0.2 }} style={{ width: '100%' }}>
              <HStack fullWidth spacing={4} padding={[4, 6]} justify='start' className='hover:text-grayscale-100 active:text-grayscale-100 transition-all duration-150 cursor-pointer select-none' onClick={() => isOpen && setIsGroupOpen((prev: boolean) => !prev)}>
                <Typography.Caption className='text-grayscale-400'>{title}</Typography.Caption>
                <motion.div
                  animate={{ rotate: isGroupOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name='chevron-right' size={16} className='text-grayscale-400' />
                </motion.div>
              </HStack>
            </motion.div>
          )
        }
      </AnimatePresence>

      <AnimatePresence>
        {isGroupOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity:    1,
                height:     'auto',
                transition: {
                  duration:        0.3,
                  staggerChildren: 0.05,
                  delayChildren:   0.1,
                },
              },
              collapsed: {
                opacity:    0,
                height:     0,
                transition: {
                  duration:         0.2,
                  staggerChildren:  0.03,
                  staggerDirection: -1,
                  when:             'afterChildren',
                },
              },
            }}
            style={{
              width: '100%', overflow: 'hidden',
            }}
          >
            <VStack fullWidth spacing={8}>
              {React.Children.map(children, (child, index) => (
                <motion.div
                  key={index}
                  variants={{
                    open: {
                      opacity:    1,
                      y:          0,
                      transition: {
                        duration: 0.2,
                        ease:     'easeOut',
                      },
                    },
                    collapsed: {
                      opacity:    0,
                      y:          -10,
                      transition: {
                        duration: 0.15,
                        ease:     'easeIn',
                      },
                    },
                  }}
                  style={{ width: '100%' }}
                >
                  {child}
                </motion.div>
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </VStack>
  );
}
