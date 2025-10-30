import { apiClient } from '@/shared/api/client';
import { UserDetailResponse, UserUpdateRequest } from '../model';

export const userApi = {
  getMe:  () => apiClient<UserDetailResponse>('/api/users/me'),
  update: (data: UserUpdateRequest) => {
    const formData = new FormData;

    if (data.name) {
      formData.append('name', data.name);
    }

    if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage);
    } else if (data.profileImage === null) {
      formData.append('profileImage', '');
    }

    return apiClient<UserDetailResponse>('/api/users', {
      method: 'PATCH',
      body:   formData,
    }, {
      successMessage: '회원 정보가 성공적으로 업데이트되었습니다.',
      pendingMessage: '회원 정보를 업데이트 중입니다...',
    });
  },
};
