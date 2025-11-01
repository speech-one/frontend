'use client';

import React from 'react';
import { cn } from '@/shared/utils';

interface SwitchProps extends Omit<React.ComponentProps<'button'>, 'type' | 'onChange'> {
  checked:   boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?:     'sm' | 'md' | 'lg';
}

const sizeVariants = {
  sm: {
    track:     'w-9 h-5',
    thumb:     'w-4 h-4',
    translate: 'translate-x-4',
  },
  md: {
    track:     'w-11 h-6',
    thumb:     'w-5 h-5',
    translate: 'translate-x-5',
  },
  lg: {
    track:     'w-13 h-7',
    thumb:     'w-6 h-6',
    translate: 'translate-x-6',
  },
};

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className,
  ...rest
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const sizeClasses = sizeVariants[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={cn('relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grayscale-100 disabled:opacity-50 disabled:cursor-not-allowed',
        checked
          ? 'bg-grayscale-100 focus:ring-grayscale-100'
          : 'bg-grayscale-600 focus:ring-grayscale-600',
        sizeClasses.track,
        className)}
      {...rest}
    >
      <span
        className={cn('inline-block rounded-full bg-grayscale-800 transform transition-transform duration-200 ease-in-out shadow-sm',
          checked ? sizeClasses.translate : 'translate-x-0.5',
          sizeClasses.thumb)}
      />
    </button>
  );
}
