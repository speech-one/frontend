import { useMutation } from '@tanstack/react-query';
import { mcpKeys } from '@/entities/mcp/model';
import { queryClient } from '@/shared/lib/react-query/client';
import { mcpApi } from '../mcp.api';

export function useAddMcp() {
  return useMutation({
    mutationFn: mcpApi.add,
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: mcpKeys.list() });
    },
  });
}
