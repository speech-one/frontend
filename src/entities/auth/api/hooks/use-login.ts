import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/entities/user';
import { authApi } from '../auth.api';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess:  data => {
      localStorage.setItem('accessToken', data.accessToken);

      localStorage.setItem('refreshToken', data.refreshToken);

      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
