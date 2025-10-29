import { apiClient } from '@/shared/api/client';
import { UserDetailResponse } from '../model';

export const userApi = { getMe: () => apiClient<UserDetailResponse>('/api/users/me') };
