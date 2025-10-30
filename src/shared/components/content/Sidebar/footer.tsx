'use client';

import { useMe } from '@/entities/user';
import { Avatar, IconButton } from '@/shared/components/content';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { useSettingsRouter } from '@/widgets/settings/hash-router';

export function SidebarFooter() {
  const { openModal } = useSettingsRouter();
  const { user } = useMe();

  return (
    <HStack fullWidth padding={[6, 10]} justify='between'>
      <HStack spacing={12}>
        <HStack spacing={8}>
          <Avatar src={user?.profileImageUrl} size={32} />
          <Typography.Label>{user?.name}</Typography.Label>
        </HStack>

        <UserCoin />
      </HStack>

      <IconButton
        icon='settings'
        onClick={() => openModal('account')}
      />
    </HStack>
  );
}

function UserCoin() {
  return (
    <HStack spacing={4} padding={[4, 6]} className='bg-yellow-translucent rounded-[20px]'>
      <Icon name='dollar-sign' size={16} className='text-yellow-solid'/>
      <Typography.Footnote className='text-yellow-solid'>200 P</Typography.Footnote>
    </HStack>
  );
}
