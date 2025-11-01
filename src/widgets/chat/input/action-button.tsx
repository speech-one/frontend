'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { IconName } from 'lucide-react/dynamic';
import { HTMLAttributes, useRef } from 'react';
import { FormField } from '@/shared/components/content/FormField';
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
  icon:          IconName;
  onClick?:      () => void;
  disabled?:     boolean;
  background?:   boolean;
  className?:    string;
  formField?:    boolean;
  type?:         'button' | 'file';
  onFileSelect?: (files: File[]) => void;
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
    formField = false,
    type = 'button',
    onFileSelect,
    ...rest
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (type === 'file' && fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      onClick?.();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0 && onFileSelect) {
      onFileSelect(files);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const button = (
    <>
      <button
        type='button'
        className={cn(iconButtonVariants({ theme }), className)}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        <Icon name={icon} size={20} className={iconVariants({ theme })}/>
      </button>
      {type === 'file' && (
        <input
          ref={fileInputRef}
          type='file'
          multiple
          className='hidden'
          onChange={handleFileChange}
        />
      )}
    </>
  );

  if (formField) {
    return (
      <FormField label=''>
        {button}
      </FormField>
    );
  }

  return button;
}
