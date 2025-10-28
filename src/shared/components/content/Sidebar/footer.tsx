'use client';

import { Avatar, IconButton } from '@/shared/components/content';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { useSettingsRouter } from '@/widgets/settings/hash-router';

export function SidebarFooter() {
  const { openModal } = useSettingsRouter();

  return (
    <HStack fullWidth padding={[6, 10]} justify='between'>
      <HStack spacing={12}>
        <HStack spacing={8}>
          <Avatar src='https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000' size={32} />
          <Typography.Label>Jeewon Kwon</Typography.Label>
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
      <Typography.Caption className='text-yellow-solid'>200 P</Typography.Caption>
    </HStack>
  );
}
