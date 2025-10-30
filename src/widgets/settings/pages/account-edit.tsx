import { useMe } from '@/entities/user';
import { UserUpdateForm } from '@/features/user';
import { IconButton } from '@/shared/components/content';
import { FormField } from '@/shared/components/content/FormField';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function AccountEditPage() {
  const { user } = useMe();

  return (
    <VStack fullWidth fullHeight justify='start' padding={24} spacing={48} className='overflow-y-auto'>
      <UserUpdateForm />

      <VStack fullWidth spacing={20}>
        <FormField label='이메일'>
          <Typography.Body width={200}>{user?.email}</Typography.Body>
        </FormField>

        <FormField label='유저 아이디'>
          <HStack spacing={8}>
            <Typography.Body width={280}>{user?.id}</Typography.Body>
            <IconButton icon='copy' onClick={() => navigator.clipboard.writeText(user?.id || '')} size='small' />
          </HStack>
        </FormField>
      </VStack>
    </VStack>
  );
}

