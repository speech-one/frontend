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
  }, {
    successMessage: '로그인에 성공했습니다.',
    pendingMessage: '로그인 중입니다...',
  }),
  register: (data: AuthRegisterRequest) => apiClient<AuthRegisterResponse>('/api/auth/register', {
    method: 'POST', body: JSON.stringify(data),
  }),
  logout: (data: AuthLogoutRequest) => apiClient<boolean>('/api/auth/logout', {
    method: 'POST', body: JSON.stringify(data),
  }, {
    errorMessage:   '로그아웃에 실패했습니다. 다시 시도해주세요.',
    pendingMessage: '로그아웃 중입니다...',
    successMessage: '로그아웃에 성공했습니다.',
  }),
  refresh: (data: AuthRefreshRequest) => apiClient<AuthRefreshResponse>('/api/auth/refresh', {
    method: 'POST', body: JSON.stringify(data),
  }),
};
