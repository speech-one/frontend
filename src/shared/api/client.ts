import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { toast } from 'sonner';
import { deleteCookie, setCookie } from '@/shared/utils';
import { ApiBaseDto } from './base-dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach(callback => callback(token));

  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method:      'POST',
    headers:     { 'Content-Type': 'application/json' },
    body:        JSON.stringify({ refreshToken }),
    credentials: 'include',
  });

  if (!response.ok) {
    localStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');

    deleteCookie('accessToken');

    deleteCookie('refreshToken');

    toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');

    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);

    throw new Error('Refresh token expired');
  }

  const responseBody: ApiBaseDto<{
    accessToken: string; refreshToken: string;
  }> = await response.json();

  if (responseBody.error || !responseBody.data) {
    localStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');

    deleteCookie('accessToken');

    deleteCookie('refreshToken');

    toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');

    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);

    throw new Error('Refresh token expired');
  }

  const { accessToken, refreshToken: newRefreshToken } = responseBody.data;

  localStorage.setItem('accessToken', accessToken);

  localStorage.setItem('refreshToken', newRefreshToken);

  setCookie('accessToken', accessToken, 7);

  setCookie('refreshToken', newRefreshToken, 30);

  return accessToken;
}

interface ApiClientToastOptions {
  successMessage?: string;
  errorMessage?:   string;
  pendingMessage?: string;
}

export async function apiClient<T>(endpoint: string,
  options?: RequestInit,
  toastOptions?: ApiClientToastOptions): Promise<T> {
  const {
    successMessage,
    errorMessage,
    pendingMessage,
  } = toastOptions || {};

  let toastId: string | number | undefined;

  if (pendingMessage) {
    toastId = toast.loading(pendingMessage);
  }

  const makeRequest = async (token?: string): Promise<Response> => {
    const accessToken = token || localStorage.getItem('accessToken') || '';
    const isFormData = options?.body instanceof FormData;

    return fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...!isFormData && { 'Content-Type': 'application/json' },
        ...accessToken && { Authorization: `Bearer ${accessToken}` },
        ...options?.headers,
      },
      ...options,
      credentials: 'include',
    });
  };

  let response = await makeRequest();

  const isLoginRequest = endpoint === '/api/auth/login';

  if (response.status === 401 && !isLoginRequest) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();

        isRefreshing = false;

        onRefreshed(newToken);

        response = await makeRequest(newToken);
      } catch (error) {
        isRefreshing = false;

        throw error;
      }
    } else {
      const newToken = await new Promise<string>(resolve => {
        addRefreshSubscriber(resolve);
      });

      response = await makeRequest(newToken);
    }
  }

  if (!response.ok) {
    const errorData: ApiBaseDto<unknown> = await response.json().catch(() => ({
      data:      null,
      error:     null,
      method:    'UNKNOWN',
      instance:  '',
      timestamp: new Date,
      status:    response.status,
    }));

    const detectedErrorMessage = errorData.details || (typeof errorData.error === 'string' ? errorData.error : String(errorData.error)) || `API Error: ${response.statusText}`;

    if (errorMessage) {
      toast.error(errorMessage, { id: toastId });
    } else {
      toast.error(detectedErrorMessage, { id: toastId });
    }

    throw new Error(detectedErrorMessage);
  }

  if (successMessage) {
    toast.success(successMessage, { id: toastId });
  }

  const responseBody: ApiBaseDto<T> = await response.json();

  if (responseBody.error) {
    const detectedErrorMessage = responseBody.details || (typeof responseBody.error === 'string' ? responseBody.error : String(responseBody.error)) || `API Error: ${response.statusText}`;

    if (errorMessage) {
      toast.error(errorMessage, { id: toastId });
    } else {
      toast.error(detectedErrorMessage, { id: toastId });
    }

    throw new Error(detectedErrorMessage);
  }

  return responseBody.data as T;
}
