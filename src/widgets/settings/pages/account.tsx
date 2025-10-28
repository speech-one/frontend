'use client';

import { overlay } from 'overlay-kit';
import { Avatar, IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '../hash-router';

export default function AccountPage() {
  const { changeTab } = useSettingsRouter();

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
        <IconButton icon='edit' onClick={() => changeTab('account/edit')} background />
        <IconButton icon='log-out' onClick={() => {
          overlay.open(({ _isOpen, close }) => {
            return (
              <div>
                <h1>Logout from Account</h1>
                <button onClick={() => close()}>Close</button>
              </div>
            );
          });
        }} theme='destructive' background />
      </HStack>
    </HStack>
  );
}

