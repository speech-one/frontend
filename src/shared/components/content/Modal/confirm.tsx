'use client';

import { useState } from 'react';
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
    isPending: externalIsPending,
  } = props;

  const [internalIsPending, setInternalIsPending] = useState(false);
  const isPending = externalIsPending || internalIsPending;

  const handleConfirm = async () => {
    setInternalIsPending(true);

    try {
      await onConfirm();

      onClose();
    } finally {
      setInternalIsPending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <VStack fullWidth fullHeight justify='center' align='center' className='bg-grayscale-800 rounded-[20px] border border-grayscale-600' padding={24} style={{
        maxWidth: '90vw', maxHeight: '90vh',
      }}>
        <VStack fullWidth spacing={8} className='min-w-0 max-h-[60vh] overflow-y-auto'>
          <Typography.Title className='wrap-break-word'>{title}</Typography.Title>
          {
            description &&
            <Typography.Label className='text-grayscale-400 wrap-break-word whitespace-pre-wrap' style={{ overflowWrap: 'anywhere' }}>{description}</Typography.Label>
          }
        </VStack>

        <HStack fullWidth justify='end' spacing={8}>
          <Button onClick={onClose} variant='outlined' leadingIcon='x' theme='destructive' isLoading={isPending} disabled={isPending}>취소</Button>
          <Button onClick={handleConfirm} leadingIcon='check' isLoading={isPending} disabled={isPending}>확인</Button>
        </HStack>
      </VStack>
    </Modal>
  );
}
