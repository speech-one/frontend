'use client';

import { IconName } from 'lucide-react/dynamic';
import { forwardRef, type TextareaHTMLAttributes, useRef } from 'react';
import { Icon } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { IconButton } from '../IconButton';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?:        boolean;
  startIcon?:        IconName;
  endIcon?:          IconName;
  onStartIconClick?: () => void;
  onEndIconClick?:   () => void;
  height?:           number | string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  disabled,
  fullWidth = true,
  startIcon,
  endIcon,
  onStartIconClick,
  onEndIconClick,
  height,
  ...props
},
ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  const handleFocusTextarea = () => {
    innerRef.current?.focus();
  };

  const textareaStyle = height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined;

  return (
    <HStack fullWidth={fullWidth} spacing={8} padding={[12, 16]} className='bg-grayscale-700 text-grayscale-100 rounded-[16px] border border-grayscale-600 overflow-hidden transition-all duration-150 hover:border-grayscale-400 hover:bg-grayscale-600 cursor-text active:brightness-90' onClick={handleFocusTextarea}>
      {startIcon && onStartIconClick &&
        <div onClick={e => e.stopPropagation()}>
          <IconButton icon={startIcon} onClick={onStartIconClick} size='small' className='cursor-pointer' />
        </div>
      }

      {startIcon && !onStartIconClick &&
        <Icon name={startIcon} size={20} className='text-grayscale-400 cursor-pointer' />
      }

      <textarea
        ref={node => {
          innerRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        disabled={disabled}
        placeholder={props.placeholder}
        className='w-full bg-transparent outline-none placeholder:text-grayscale-300 placeholder:text-body placeholder:font-body placeholder:tracking-[-0.04em] placeholder:leading-[140%] resize-none'
        style={textareaStyle}
        {...props}
      />

      {endIcon && onEndIconClick &&
        <div onClick={e => e.stopPropagation()}>
          <IconButton icon={endIcon} onClick={onEndIconClick} size='small' className='cursor-pointer' />
        </div>
      }

      {endIcon && !onEndIconClick &&
        <Icon name={endIcon} size={20} className='text-grayscale-400 cursor-pointer' />
      }
    </HStack>
  );
});

Textarea.displayName = 'Textarea';

