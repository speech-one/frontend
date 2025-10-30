'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useMe,
  UserUpdateRequest,
  userUpdateSchema,
  useUpdateUser,
} from '@/entities/user';
import { Button, FormTemplate } from '@/shared/components/content';
import { FormAvatarField, FormInputField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';

export function UserUpdateForm() {
  const updateUser = useUpdateUser();
  const { user } = useMe();

  const form = useForm<UserUpdateRequest>({
    defaultValues: {
      name:         '',
      profileImage: undefined,
    },
    resolver: zodResolver(userUpdateSchema),
  });

  async function onSubmit(data: UserUpdateRequest) {
    await updateUser.mutateAsync(data);
  }

  useEffect(() => {
    if (user) {
      form.reset({
        name:         user.name,
        profileImage: user.profileImageUrl || undefined,
      });
    }
  }, [user]);

  return (
    <FormTemplate form={form} onSubmit={onSubmit} isLoading={updateUser.isPending}>
      <VStack fullWidth spacing={16} align='end'>
        <VStack fullWidth spacing={16} align='start'>
          <FormAvatarField
            name='profileImage'
            control={form.control}
            size={72}
          />

          <FormInputField name='name' label='이름' width={300} control={form.control} placeholder='이름을 입력해주세요.'/>
        </VStack>

        <Button type='submit'>저장</Button>
      </VStack>
    </FormTemplate>
  );
}
