import { useUser } from '@/entities/user';
import { Avatar, IconButton } from '@/shared/components/content';
import { FormField } from '@/shared/components/content/FormField';
import { Input } from '@/shared/components/content/Input';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function AccountEditPage() {
  const { user } = useUser();

  return (
    <VStack fullWidth fullHeight justify='start' padding={24} spacing={48} className='overflow-y-auto'>
      <HStack fullWidth spacing={16}>
        <Avatar size={72} src={user?.profileImageUrl} />

        <FormField label='이름' width={300}>
          <Input placeholder='이름을 입력해주세요.' value={user?.name} />
        </FormField>
      </HStack>

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

