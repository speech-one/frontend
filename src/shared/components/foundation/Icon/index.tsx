'use client';

import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { cn } from '@/shared/utils';

export interface IconProps {
  name:       IconName;
  size?:      number;
  className?: string;
}

export function Icon({
  name,
  size = 20,
  className,
  ...props
}: IconProps) {
  return (
    <DynamicIcon name={name} size={size} className={cn('text-grayscale-100', className)} {...props}/>
  );
}
