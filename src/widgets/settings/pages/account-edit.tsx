import { Avatar } from '@/shared/components/content';
import { FormField } from '@/shared/components/content/FormField';
import { Input } from '@/shared/components/content/Input';
import { HStack, VStack } from '@/shared/components/layout';

export default function AccountEditPage() {
  return (
    <VStack fullWidth fullHeight justify='start' padding={24} spacing={24} className='overflow-y-auto'>
      <HStack fullWidth spacing={16}>
        <Avatar size={72} src='https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000' />

        <FormField label='이름' width={300}>
          <Input placeholder='이름을 입력해주세요.' />
        </FormField>
      </HStack>
    </VStack>
  );
}

