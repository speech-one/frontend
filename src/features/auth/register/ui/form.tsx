'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthRegisterRequest, authRegisterSchema } from '@/entities/auth';
import { useRegister } from '@/entities/auth/api/hooks';
import { Button, FormTemplate } from '@/shared/components/content';
import { FormAvatarField, FormInputField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';

export function RegisterForm() {
  const router = useRouter();
  const register = useRegister();

  const form = useForm<AuthRegisterRequest>({
    defaultValues: {
      name:         '',
      email:        '',
      password:     '',
      profileImage: undefined,
    },
    resolver: zodResolver(authRegisterSchema),
  });

  const onSubmit = async (data: AuthRegisterRequest) => {
    await register.mutateAsync(data);

    router.push('/');
  };

  return (
    <FormTemplate form={form} onSubmit={onSubmit} isLoading={register.isPending}>
      <VStack fullWidth spacing={24}>
        <FormAvatarField
          name='profileImage'
          label='프로필 이미지'
          control={form.control}
        />

        <FormInputField
          name='name'
          label='이름'
          placeholder='이름을 입력해주세요'
          control={form.control}
        />

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
        <Button type='submit' leadingIcon='user-plus' fullWidth size='lg'>회원가입</Button>
        <Button variant='text' size='sm' onClick={() => router.push('/auth/login')}>로그인</Button>
      </VStack>
    </FormTemplate>
  );
}
