import { useQuery } from '@tanstack/react-query';
import { mcpKeys } from '@/entities/mcp/model';
import { mcpApi } from '../mcp.api';

export function useMcpList() {
  const { data: mcpList, ...rest } = useQuery({
    queryKey: mcpKeys.list(),
    queryFn:  mcpApi.list,
  });

  return {
    mcpList,
    ...rest,
  };
}
