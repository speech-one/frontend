import { useMutation } from '@tanstack/react-query';
import { userKeys } from '@/entities/user';
import { queryClient } from '@/shared/lib/react-query/client';
import { deleteCookie } from '@/shared/utils';
import { authApi } from '../auth.api';

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess:  () => {
      localStorage.removeItem('accessToken');

      localStorage.removeItem('refreshToken');

      deleteCookie('accessToken');

      deleteCookie('refreshToken');

      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
