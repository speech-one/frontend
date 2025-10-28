'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { overlay } from 'overlay-kit';
import { Avatar, Backdrop, IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '../hash-router';

export default function AccountPage() {
  const { changeTab } = useSettingsRouter();

  const handleLogout = () => {
    overlay.open(({
      isOpen,
      close,
      unmount,
    }) => {
      return (
        <AnimatePresence mode='wait' onExitComplete={unmount}>
          {isOpen && (
            <Backdrop onClick={close}>
              <motion.div
                initial={{
                  opacity: 0,
                  scale:   0.95,
                }}
                animate={{
                  opacity: 1,
                  scale:   1,
                }}
                exit={{
                  opacity: 0,
                  scale:   0.95,
                }}
                transition={{
                  duration: 0.2,
                  ease:     'easeOut',
                }}
                onClick={e => e.stopPropagation()}
                className='bg-grayscale-800 rounded-[16px] p-6 max-w-md'
              >
                <VStack spacing={16} align='start'>
                  <VStack spacing={8} align='start'>
                    <Typography.Title>로그아웃</Typography.Title>
                    <Typography.Body className='text-grayscale-400'>
                      정말 로그아웃하시겠습니까?
                    </Typography.Body>
                  </VStack>

                  <HStack fullWidth spacing={8} justify='end'>
                    <button
                      onClick={close}
                      className='px-4 py-2 bg-grayscale-700 text-grayscale-200 rounded-[8px] hover:bg-grayscale-600 transition-colors'
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        close();
                      }}
                      className='px-4 py-2 bg-red-500 text-white rounded-[8px] hover:bg-red-600 transition-colors'
                    >
                      로그아웃
                    </button>
                  </HStack>
                </VStack>
              </motion.div>
            </Backdrop>
          )}
        </AnimatePresence>
      );
    });
  };

  return (
    <HStack fullWidth padding={[12, 20]} justify='between' className='bg-grayscale-700 rounded-[12px]'>
      <HStack spacing={16}>
        <Avatar size={56} src='https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000' />
        <VStack spacing={4}>
          <Typography.Body>Jeewon Kwon</Typography.Body>
          <Typography.Footnote className='text-grayscale-400'>jeewon.kwon.0817@gmail.com</Typography.Footnote>
        </VStack>
      </HStack>

      <HStack spacing={8}>
        <IconButton icon='edit' onClick={() => changeTab('account', 'edit')} background />
        <IconButton icon='log-out' onClick={handleLogout} theme='destructive' background />
      </HStack>
    </HStack>
  );
}

