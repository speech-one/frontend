import { useMutation } from '@tanstack/react-query';
import { basePromptKeys } from '@/entities/base-prompt/model';
import { queryClient } from '@/shared/lib/react-query/client';
import { basePromptApi } from '../base-prompt.api';

export function useDeleteBasePrompt() {
  return useMutation({
    mutationFn: basePromptApi.delete,
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: basePromptKeys.all });
    },
  });
}
