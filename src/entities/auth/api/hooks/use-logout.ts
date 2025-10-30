import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { userKeys } from '@/entities/user';
import { deleteCookie } from '@/shared/utils';
import { authApi } from '../auth.api';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess:  () => {
      localStorage.removeItem('accessToken');

      localStorage.removeItem('refreshToken');

      deleteCookie('accessToken');

      deleteCookie('refreshToken');

      queryClient.invalidateQueries({ queryKey: userKeys.me() });

      setTimeout(() => {
        redirect('/auth/login');
      }, 500);
    },
  });
}
