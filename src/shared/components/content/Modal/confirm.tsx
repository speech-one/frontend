import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { Button } from '..';
import { Modal } from '.';

interface ConfirmModalProps {
  title:        string;
  description?: string;
  isOpen:       boolean;
  onClose:      () => void;
  onConfirm:    () => Promise<void>;
  isPending?:   boolean;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    title,
    description,
    isOpen,
    onClose,
    onConfirm,
    isPending,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack fullWidth fullHeight justify='center' align='center' className='bg-grayscale-800 rounded-[20px] border border-grayscale-600' padding={24}>
        <VStack fullWidth spacing={8}>
          <Typography.Title>{title}</Typography.Title>
          {
            description &&
            <Typography.Label className='text-grayscale-400'>{description}</Typography.Label>
          }
        </VStack>

        <HStack fullWidth justify='end' spacing={8}>
          <Button onClick={onClose} variant='outlined' leadingIcon='x' theme='destructive' isLoading={isPending}>취소</Button>
          <Button onClick={async () => {
            await onConfirm();

            onClose();
          }} leadingIcon='check' isLoading={isPending}>확인</Button>
        </HStack>
      </VStack>
    </Modal>
  );
}
