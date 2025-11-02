import { apiClient } from '@/shared/api/client';
import { AddMcpRequest, UpdateMcpRequest } from '../model/request';
import { McpDetailResponse, McpListResponse } from '../model/response';

export const mcpApi = {
  add: (data: AddMcpRequest) => apiClient<boolean>('/api/mcp', {
    method: 'POST', body: JSON.stringify(data),
  }, {
    successMessage: 'MCP가 성공적으로 추가되었습니다.',
    pendingMessage: 'MCP를 추가 중입니다...',
  }),
  update: (id: string, data: UpdateMcpRequest) => apiClient<boolean>(`/api/mcp/${id}`, {
    method: 'PATCH', body: JSON.stringify(data),
  }, {
    successMessage: 'MCP가 성공적으로 업데이트되었습니다.',
    pendingMessage: 'MCP를 업데이트 중입니다...',
  }),
  delete: (id: string) => apiClient<boolean>(`/api/mcp/${id}`, { method: 'DELETE' }, {
    successMessage: 'MCP가 성공적으로 삭제되었습니다.',
    pendingMessage: 'MCP를 삭제 중입니다...',
  }),
  list:   () => apiClient<McpListResponse>('/api/mcp', { method: 'GET' }, { errorMessage: 'MCP 목록을 조회하는데 실패했습니다.' }),
  detail: (id: string) => apiClient<McpDetailResponse>(`/api/mcp/${id}`, { method: 'GET' }, { errorMessage: 'MCP 상세 정보를 조회하는데 실패했습니다.' }),
};
