import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddMcpRequest, addMcpSchema, useAddMcp } from '@/entities/mcp';
import { Button, FormTemplate, FormTemplateContent } from '@/shared/components/content';
import { FormTextareaField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '@/widgets/settings/hash-router';

export function AddMcpForm() {
  const addMcp = useAddMcp();
  const { changeTab } = useSettingsRouter();

  const form = useForm<AddMcpRequest>({
    defaultValues: { json: '' },
    resolver:      zodResolver(addMcpSchema),
  });

  const onSubmit = async (data: AddMcpRequest) => {
    await addMcp.mutateAsync(data);

    changeTab('mcp');
  };

  const placeholder = `{
  "mcpServers": {
    "stdio-server-example": {
      "transport": "sse",
      "args": ["-y", "mcp-server-example"]
    }
  }
}`;

  return (
    <FormTemplate form={form} onSubmit={onSubmit} isLoading={addMcp.isPending} className='h-full'>
      <VStack fullWidth fullHeight spacing={12} align='end'>
        <FormTemplateContent>
          <FormTextareaField
            label=''
            name='json'
            control={form.control}
            placeholder={placeholder}
            height={300}
          />
        </FormTemplateContent>

        <Button type='submit' leadingIcon='plus' size='md'>등록하기</Button>
      </VStack>
    </FormTemplate>
  );
}
