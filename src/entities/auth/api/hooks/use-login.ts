import { useMutation } from '@tanstack/react-query';
import { userKeys } from '@/entities/user';
import { queryClient } from '@/shared/lib/react-query/client';
import { setCookie } from '@/shared/utils';
import { authApi } from '../auth.api';

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess:  data => {
      localStorage.setItem('accessToken', data.accessToken);

      localStorage.setItem('refreshToken', data.refreshToken);

      setCookie('accessToken', data.accessToken, 7);

      setCookie('refreshToken', data.refreshToken, 30);

      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
