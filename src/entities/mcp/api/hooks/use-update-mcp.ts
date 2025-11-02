import { useMutation } from '@tanstack/react-query';
import { mcpKeys, UpdateMcpRequest } from '@/entities/mcp/model';
import { queryClient } from '@/shared/lib/react-query/client';
import { mcpApi } from '../mcp.api';

export function useUpdateMcp() {
  return useMutation({
    mutationFn: ({ id, data }: {
      id: string; data: UpdateMcpRequest;
    }) => mcpApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mcpKeys.list() });
    },
  });
}
