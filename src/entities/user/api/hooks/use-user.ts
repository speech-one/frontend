import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/entities/user/model';
import { userApi } from '../user.api';

export function useUser() {
  const { data: user, ...rest } = useQuery({
    queryKey:  userKeys.me(),
    queryFn:   userApi.getMe,
    staleTime: 5 * 60 * 1000,
    gcTime:    10 * 60 * 1000,
  });

  return {
    user, ...rest,
  };
}
