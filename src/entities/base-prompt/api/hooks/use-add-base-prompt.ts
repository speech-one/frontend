import { useMutation } from '@tanstack/react-query';
import { basePromptKeys } from '@/entities/base-prompt/model';
import { queryClient } from '@/shared/lib/react-query/client';
import { basePromptApi } from '../base-prompt.api';

export function useAddBasePrompt() {
  return useMutation({
    mutationFn: basePromptApi.add,
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: basePromptKeys.all });
    },
  });
}
