import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/entities/user';
import { authApi } from '../auth.api';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
