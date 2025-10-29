import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { toast } from 'sonner';

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
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    localStorage.removeItem('accessToken');

    localStorage.removeItem('refreshToken');

    toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');

    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);

    throw new Error('Refresh token expired');
  }

  const data = await response.json();
  const { accessToken, refreshToken: newRefreshToken } = data;

  localStorage.setItem('accessToken', accessToken);

  localStorage.setItem('refreshToken', newRefreshToken);

  return accessToken;
}

export async function apiClient<T>(endpoint: string,
  options?: RequestInit): Promise<T> {
  const makeRequest = async (token?: string): Promise<Response> => {
    const accessToken = token || localStorage.getItem('accessToken') || '';

    return fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...accessToken && { Authorization: `Bearer ${accessToken}` },
        ...options?.headers,
      },
      ...options,
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
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.details || errorData.message || `API Error: ${response.statusText}`;

    toast.error(errorMessage);

    throw new Error(errorMessage);
  }

  return response.json();
}
