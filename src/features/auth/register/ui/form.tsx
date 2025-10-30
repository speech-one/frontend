import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthRegisterRequest, authRegisterSchema } from '@/entities/auth';
import { useRegister } from '@/entities/auth/api/hooks';
import { Button, Form } from '@/shared/components/content';
import { FormInputField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';

export function RegisterForm() {
  const router = useRouter();
  const register = useRegister();

  const form = useForm<AuthRegisterRequest>({
    defaultValues: {
      name:     '',
      email:    '',
      password: '',
      avatar:   undefined,
    },
    resolver: zodResolver(authRegisterSchema),
  });

  const onSubmit = async (data: AuthRegisterRequest) => {
    await register.mutateAsync(data);

    router.push('/');
  };

  return (
    <VStack fullWidth spacing={24}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <VStack fullWidth spacing={32} align='end'>
            <VStack fullWidth spacing={24}>
              <FormInputField
                name='email'
                label='이메일'
                type='email'
                placeholder='이메일을 입력해주세요'
                control={form.control}
              />

              <FormInputField
                name='password'
                label='비밀번호'
                type='password'
                placeholder='비밀번호를 입력해주세요'
                control={form.control}
              />
            </VStack>

            <VStack fullWidth align='end' spacing={8}>
              <Button type='submit' leadingIcon='log-in' fullWidth size='lg'>로그인</Button>
              <Button variant='text' size='sm' onClick={() => router.push('/auth/register')}>회원가입</Button>
            </VStack>
          </VStack>
        </form>
      </Form>
    </VStack>
  );
}
