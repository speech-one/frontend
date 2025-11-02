import { useBasePromptList } from '@/entities/base-prompt';
import { AddBasePromptForm, BasePromptItem } from '@/features/base-prompt';
import { Skeleton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function BasePromptPage() {
  const { basePromptList, isPending } = useBasePromptList();
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
            isPending
              ? Array.from({ length: 3 })
                .map((_, index) => <Skeleton key={index} variant='rounded' className='w-full' height={52} />)
              : basePromptList?.map(basePrompt => <BasePromptItem key={basePrompt.id} id={basePrompt.id} prompt={basePrompt.prompt} />)
          }

          {
            isBasePromptListEmpty
              ?               <Typography.Label className='text-grayscale-400'>등록한 프롬프트가 없습니다.</Typography.Label>
              : null
          }
        </VStack>
      </VStack>
    </VStack>
  );
}

