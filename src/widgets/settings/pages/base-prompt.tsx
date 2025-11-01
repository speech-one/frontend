import { useBasePromptList } from '@/entities/base-prompt';
import { AddBasePromptForm, BasePromptItem } from '@/features/base-prompt';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function BasePromptPage() {
  const { basePromptList } = useBasePromptList();
  const isBasePromptListEmpty = basePromptList?.length === 0;

  return (
    <VStack fullWidth fullHeight className='overflow-y-auto' spacing={24} justify='start'>
      <AddBasePromptForm />

      <VStack fullWidth spacing={12} align='start'>
        <HStack justify='center' spacing={8}>
          <Typography.Title>등록한 프롬프트 목록</Typography.Title>
          {
            basePromptList && <Typography.Label className='text-grayscale-400'>{basePromptList?.length}개</Typography.Label>
          }
        </HStack>

        <VStack fullWidth spacing={8}>
          {
            isBasePromptListEmpty
              ?               <Typography.Label className='text-grayscale-400'>등록한 프롬프트가 없습니다.</Typography.Label>
              :               basePromptList?.map(basePrompt => <BasePromptItem key={basePrompt.id} id={basePrompt.id} prompt={basePrompt.prompt} />)

          }
        </VStack>
      </VStack>
    </VStack>
  );
}

