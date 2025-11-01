import { apiClient } from '@/shared/api/client';
import { AddBasePromptRequest, BasePromptDetailResponse } from '../model';
import { BasePromptListResponse } from '../model/response/base-prompt-list';

export const basePromptApi = {
  add: (data: AddBasePromptRequest) => apiClient<BasePromptDetailResponse>('/api/base-prompt', {
    method: 'POST', body: JSON.stringify(data),
  }, {
    successMessage: '기본 프롬프트가 성공적으로 추가되었습니다.',
    pendingMessage: '기본 프롬프트를 추가 중입니다...',
  }),
  delete: (id: string) => apiClient<boolean>(`/api/base-prompt/${id}`, { method: 'DELETE' }, {
    successMessage: '기본 프롬프트가 성공적으로 삭제되었습니다.',
    pendingMessage: '기본 프롬프트를 삭제 중입니다...',
  }),
  list: () => apiClient<BasePromptListResponse[]>('/api/base-prompt', { method: 'GET' }, { errorMessage: '기본 프롬프트 목록을 조회하는데 실패했습니다.' }),
};
