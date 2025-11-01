'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { IconButton } from '@/shared/components/content';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { getSettingsPageById, getSettingsSubPageById } from './config';
import { useSettingsRouter } from './hash-router';

interface SettingsTemplateProps {
  children: React.ReactNode;
  pageKey:  string;
}

export function SettingsTemplate(props: SettingsTemplateProps) {
  const { children, pageKey } = props;

  const {
    currentTab,
    currentSubPage,
    closeModal,
    goBack,
  } = useSettingsRouter();

  const pageConfig = getSettingsPageById(currentTab);
  const subPageConfig = currentSubPage ? getSettingsSubPageById(currentTab, currentSubPage) : null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pageKey}
        initial={{
          opacity: 0,
          x:       10,
        }}
        animate={{
          opacity: 1,
          x:       0,
        }}
        exit={{
          opacity: 0,
          x:       -10,
        }}
        transition={{
          duration: 0.1,
          ease:     'easeInOut',
        }}
        className='w-full overflow-hidden'
      >
        <VStack fullWidth spacing={32} justify='start'>
          {pageConfig && (
            <HStack
              fullWidth
              justify='between'
              align='start'
            >
              <HStack spacing={8} align='start'>
                {currentSubPage &&
                  <IconButton icon='arrow-left' onClick={goBack} className='text-grayscale-300'/>
                }
                <VStack spacing={4} align='start'>
                  <HStack spacing={8} align='center'>
                    <HStack spacing={8} align='center'>
                      <Typography.Title className={clsx(currentSubPage ? 'text-grayscale-300' : 'text-grayscale-100')}>
                        {pageConfig.title}
                      </Typography.Title>

                      {subPageConfig && (
                        <>
                          <Icon name='chevron-right' size={20} className='text-grayscale-500' />
                          <Typography.Title>
                            {subPageConfig.title}
                          </Typography.Title>
                        </>
                      )}
                    </HStack>
                  </HStack>

                  <Typography.Label className='text-grayscale-400'>
                    {currentSubPage ? subPageConfig?.description : pageConfig.description}
                  </Typography.Label>
                </VStack>
              </HStack>

              <IconButton icon='x' onClick={() => {
                closeModal();
              }} />
            </HStack>
          )}

          <div className='flex-1 w-full overflow-y-auto min-h-0'>
            {children}
          </div>
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
}
