import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/entities/user/model';
import { userApi } from '../user.api';

export function useUser() {
  const { data: user, ...rest } = useQuery({
    queryKey: userKeys.me(),
    queryFn:  userApi.getMe,
  });

  return {
    user, ...rest,
  };
}
