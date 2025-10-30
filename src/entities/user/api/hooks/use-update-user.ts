import { useMutation } from '@tanstack/react-query';
import { userKeys } from '@/entities/user/model';
import { queryClient } from '@/shared/lib/react-query/client';
import { userApi } from '../user.api';

export function useUpdateUser() {
  return useMutation({
    mutationFn: userApi.update,
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}
