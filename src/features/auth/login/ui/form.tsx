import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthLoginRequest, authLoginSchema } from '@/entities/auth';
import { useLogin } from '@/entities/auth/api/hooks';
import { Button, Divider, Form } from '@/shared/components/content';
import { FormInputField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();

  const form = useForm<AuthLoginRequest>({
    defaultValues: {
      email:    '',
      password: '',
    },
    resolver: zodResolver(authLoginSchema),
  });

  const onSubmit = async (data: AuthLoginRequest) => {
    await login.mutateAsync(data);

    toast.success('로그인 성공!');

    router.push('/');
  };

  return (
    <VStack fullWidth spacing={24}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <VStack fullWidth spacing={32}>
            <VStack fullWidth spacing={24}>
              <FormInputField
                name='email'
                label='이메일'
                placeholder='이메일을 입력해주세요'
                control={form.control}
              />

              <FormInputField
                name='password'
                label='비밀번호'
                placeholder='비밀번호를 입력해주세요'
                control={form.control}
              />
            </VStack>

            <Button type='submit' leadingIcon='log-in' fullWidth size='lg' isLoading={login.isPending}>로그인</Button>
          </VStack>
        </form>
      </Form>

      <Divider className='bg-grayscale-600' />

      <Button variant='outlined' fullWidth size='lg'>회원가입</Button>
    </VStack>
  );
}
