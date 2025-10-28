'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { IconName } from 'lucide-react/dynamic';
import { HTMLAttributes } from 'react';
import { Icon } from '@/shared/components/foundation';
import { cn } from '@/shared/utils';

const iconButtonVariants = cva('inline-flex items-center justify-center transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
  {
    variants: {
      theme: {
        monochrome:  'text-grayscale-300',
        destructive: 'text-red-solid',
        warning:     'text-yellow-solid',
      },
      size: {
        small:  'p-[4px] rounded-[6px]',
        medium: 'p-[6px] rounded-[8px]',
        large:  'p-[8px] rounded-[10px]',
      },
      background: {
        true:  '',
        false: '',
      },
    },
    compoundVariants: [
      {
        theme:      'monochrome',
        background: true,
        className:  'bg-grayscale-300/20 hover:bg-grayscale-300/30',
      },
      {
        theme:      'destructive',
        background: true,
        className:  'bg-red-translucent hover:bg-red-translucent/80',
      },
      {
        theme:      'warning',
        background: true,
        className:  'bg-yellow-translucent hover:bg-yellow-translucent/80',
      },
      {
        theme:      'monochrome',
        background: false,
        className:  'hover:bg-grayscale-300/20',
      },
      {
        theme:      'destructive',
        background: false,
        className:  'hover:bg-red-translucent',
      },
      {
        theme:      'warning',
        background: false,
        className:  'hover:bg-yellow-translucent',
      },
    ],
    defaultVariants: {
      theme:      'monochrome',
      size:       'medium',
      background: false,
    },
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

const iconVariants = cva('text-grayscale-300', {
  variants: { theme: {
    monochrome:  'text-grayscale-300',
    destructive: 'text-red-solid',
    warning:     'text-yellow-solid',
  } },
  defaultVariants: { theme: 'monochrome' },
});

const iconSizeVariants: Record<NonNullable<IconButtonProps['size']>, number> = {
  small:  20,
  medium: 24,
  large:  28,
};

export function IconButton(props: IconButtonProps) {
  const {
    icon,
    onClick,
    disabled = false,
    className,
    theme,
    size,
    background,
    ...rest
  } = props;

  return (
    <button
      className={cn(iconButtonVariants({
        theme, size, background,
      }), className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Icon name={icon} size={iconSizeVariants[size ?? 'medium']} className={iconVariants({ theme })}/>
    </button>
  );
}
