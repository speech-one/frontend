import { apiClient } from '@/shared/api/client';
import {
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthRefreshRequest,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from '../model';
import { AuthLoginResponse } from '../model/response/login';
import { AuthRefreshResponse } from '../model/response/refresh';

export const authApi = {
  login: (data: AuthLoginRequest) => apiClient<AuthLoginResponse>('/api/auth/login', {
    method: 'POST', body: JSON.stringify(data),
  }),
  register: (data: AuthRegisterRequest) => apiClient<AuthRegisterResponse>('/api/auth/register', {
    method: 'POST', body: JSON.stringify(data),
  }),
  logout: (data: AuthLogoutRequest) => apiClient<boolean>('/api/auth/logout', {
    method: 'POST', body: JSON.stringify(data),
  }),
  refresh: (data: AuthRefreshRequest) => apiClient<AuthRefreshResponse>('/api/auth/refresh', {
    method: 'POST', body: JSON.stringify(data),
  }),
};
