'use client';

import { IconName } from 'lucide-react/dynamic';
import { Icon } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { cn } from '@/shared/utils';
import { IconButton } from '../IconButton';

export interface ChipProps {
  label:      string;
  onRemove?:  () => void;
  icon?:      IconName;
  className?: string;
}

export function Chip(props: ChipProps) {
  const {
    label,
    onRemove,
    icon,
    className,
  } = props;

  return (
    <HStack
      spacing={6}
      padding={[6, 10]}
      className={cn('inline-flex items-center rounded-full bg-grayscale-600 text-grayscale-100 border border-grayscale-500 shrink-0',
        className)}
    >
      {icon && <Icon name={icon} size={16} className='text-grayscale-300 shrink-0' />}
      <span className='text-label font-label tracking-[-0.04em] leading-[140%] truncate max-w-[150px]'>{label}</span>
      {onRemove &&
        <IconButton icon='x' size='small' onClick={onRemove} className='p-0.5 rounded-full'/>
      }
    </HStack>
  );
}

