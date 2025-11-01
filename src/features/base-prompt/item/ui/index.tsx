import { overlay } from 'overlay-kit';
import { useDeleteBasePrompt } from '@/entities/base-prompt';
import { ConfirmModal, IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';

interface BasePromptItemProps {
  id:     string;
  prompt: string;
}

export function BasePromptItem(props: BasePromptItemProps) {
  const { id, prompt } = props;
  const deleteBasePrompt = useDeleteBasePrompt();

  const handleDeleteBasePrompt = async () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <ConfirmModal
          title='기본 프롬프트 삭제'
          description={'다음 프롬프트를 삭제하시겠습니까?'}
          isOpen={isOpen}
          onClose={close}
          isPending={deleteBasePrompt.isPending}
          onConfirm={async () => {
            await deleteBasePrompt.mutateAsync(id);
          }} />
      );
    });
  };

  return (
    <HStack fullWidth justify='between' padding={[12, 16]} className='bg-grayscale-700 rounded-[10px]' spacing={8} align='center'>
      <div className='flex-1 min-w-0 overflow-hidden'>
        <Typography.Label className='truncate block'>{prompt}</Typography.Label>
      </div>

      <IconButton icon='trash' theme='destructive' size='small' background onClick={handleDeleteBasePrompt} className='shrink-0' />
    </HStack>
  );
}
