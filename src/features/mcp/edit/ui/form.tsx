'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateMcpRequest,
  updateMcpSchema,
  useMcpDetail,
  useUpdateMcp,
} from '@/entities/mcp';
import { Button, FormTemplate, FormTemplateContent } from '@/shared/components/content';
import { FormTextareaField } from '@/shared/components/form';
import { VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '@/widgets/settings/hash-router';

interface EditMcpFormProps {
  id: string;
}

export function EditMcpForm(props: EditMcpFormProps) {
  const { id } = props;
  const updateMcp = useUpdateMcp();
  const { changeTab } = useSettingsRouter();
  const { mcpDetail } = useMcpDetail(id);

  const form = useForm<UpdateMcpRequest>({
    defaultValues: { json: '' },
    resolver:      zodResolver(updateMcpSchema),
  });

  const onSubmit = async (data: UpdateMcpRequest) => {
    await updateMcp.mutateAsync({
      id, data,
    });

    changeTab('mcp');
  };

  useEffect(() => {
    if (mcpDetail) {
      form.setValue('json', mcpDetail.metadata);
    }
  }, [mcpDetail]);

  const placeholder = `{
  "mcpServers": {
    "stdio-server-example": {
      "transport": "sse",
      "args": ["-y", "mcp-server-example"]
    }
  }
}`;

  return (
    <FormTemplate form={form} onSubmit={onSubmit} isLoading={updateMcp.isPending} className='h-full'>
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

        <Button type='submit' leadingIcon='save' size='md'>저장하기</Button>
      </VStack>
    </FormTemplate>
  );
}
