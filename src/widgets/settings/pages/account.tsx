'use client';

import { overlay } from 'overlay-kit';
import { useLogout } from '@/entities/auth';
import { useUser } from '@/entities/user';
import { Avatar, ConfirmModal, IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '../hash-router';

export default function AccountPage() {
  const { changeTab } = useSettingsRouter();
  const logout = useLogout();  const { user } = useUser();

  const handleLogout = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <ConfirmModal title='로그아웃'
          description='로그아웃 하시겠습니까?'
          isPending={logout.isPending}
          isOpen={isOpen} onClose={close} onConfirm={async () => {
            await logout.mutateAsync({ refreshToken: localStorage.getItem('refreshToken') || '' });
          }} />
      );
    });
  };

  return (
    <HStack fullWidth padding={[12, 20]} justify='between' className='bg-grayscale-700 rounded-[12px]'>
      <HStack spacing={16}>
        <Avatar size={56} src={user?.profileImageUrl} />
        <VStack spacing={4}>
          <Typography.Body>{user?.name}</Typography.Body>
          <Typography.Footnote className='text-grayscale-400'>{user?.email}</Typography.Footnote>
        </VStack>
      </HStack>

      <HStack spacing={8}>
        <IconButton icon='pencil' onClick={() => changeTab('account', 'edit')} background />
        <IconButton icon='log-out' onClick={handleLogout} theme='destructive' background />
      </HStack>
    </HStack>
  );
}

