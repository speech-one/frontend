'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { IconName } from 'lucide-react/dynamic';
import { HTMLAttributes } from 'react';
import { Icon } from '@/shared/components/foundation';
import { cn } from '@/shared/utils';

const iconButtonVariants = cva('inline-flex items-center justify-center transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer p-[4px] rounded-full border border-grayscale-400',
  {
    variants: { theme: {
      monochrome:  'text-grayscale-100 bg-grayscale-700 hover:brightness-90',
      destructive: 'text-red-solid bg-red-translucent hover:brightness-90',
      warning:     'text-yellow-solid bg-yellow-translucent hover:brightness-90',
    } },
    defaultVariants: { theme: 'monochrome' },
  });

interface IconButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof iconButtonVariants> {
  icon:        IconName;
  onClick?:    () => void;
  disabled?:   boolean;
  background?: boolean;
  className?:  string;
}

const iconVariants = cva('text-grayscale-100', {
  variants: { theme: {
    monochrome:  'text-grayscale-100',
    destructive: 'text-red-solid',
    warning:     'text-yellow-solid',
  } },
  defaultVariants: { theme: 'monochrome' },
});

export function ChatInputActionButton(props: IconButtonProps) {
  const {
    icon,
    onClick,
    disabled = false,
    className,
    theme,
    ...rest
  } = props;

  return (
    <button
      type='button'
      className={cn(iconButtonVariants({ theme }), className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Icon name={icon} size={20} className={iconVariants({ theme })}/>
    </button>
  );
}
