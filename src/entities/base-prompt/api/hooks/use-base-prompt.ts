import { useQuery } from '@tanstack/react-query';
import { basePromptKeys } from '@/entities/base-prompt/model';
import { basePromptApi } from '../base-prompt.api';

export function useBasePromptList() {
  const { data: basePromptList, ...rest } = useQuery({
    queryKey:  basePromptKeys.all,
    queryFn:   basePromptApi.list,
    staleTime: 5 * 60 * 1000,
    gcTime:    10 * 60 * 1000,
  });

  return {
    basePromptList, ...rest,
  };
}
