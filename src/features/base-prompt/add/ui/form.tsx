import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddBasePromptRequest, addBasePromptSchema, useAddBasePrompt } from '@/entities/base-prompt';
import { Button, FormTemplate, FormTemplateContent } from '@/shared/components/content';
import { FormTextareaField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';

export function AddBasePromptForm() {
  const addBasePrompt = useAddBasePrompt();

  const form = useForm<AddBasePromptRequest>({
    defaultValues: { prompt: '' },
    resolver:      zodResolver(addBasePromptSchema),
  });

  const onSubmit = async (data: AddBasePromptRequest) => {
    await addBasePrompt.mutateAsync(data);

    form.reset();
  };

  return (
    <FormTemplate form={form} onSubmit={onSubmit} isLoading={addBasePrompt.isPending}>
      <VStack fullWidth spacing={12} align='end'>
        <FormTemplateContent>
          <FormTextareaField name='prompt' label='프롬프트' control={form.control} placeholder='프롬프트를 입력해주세요.' height={200} />
        </FormTemplateContent>

        <Button type='submit' leadingIcon='plus' size='md'>등록하기</Button>
      </VStack>
    </FormTemplate>
  );
}
