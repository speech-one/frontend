import { useQuery } from '@tanstack/react-query';
import { mcpKeys } from '@/entities/mcp/model';
import { mcpApi } from '../mcp.api';

export function useMcpDetail(id: string) {
  const { data: mcpDetail, ...rest } = useQuery({
    queryKey: mcpKeys.detail(id),
    queryFn:  () => mcpApi.detail(id),
  });

  return {
    mcpDetail,
    ...rest,
  };
}
