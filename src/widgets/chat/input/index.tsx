'use client';

import { forwardRef, type TextareaHTMLAttributes, useRef } from 'react';
import { HStack, VStack } from '@/shared/components/layout';
import { ChatInputActionButton } from './action-button';

export interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
  height?:    number | string;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(({
  disabled,
  fullWidth = true,
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
    <HStack fullWidth={fullWidth} spacing={8} padding={[12, 16]} className='bg-grayscale-700 text-grayscale-100 rounded-[16px] border border-grayscale-600 overflow-hidden transition-all duration-150 hover:border-grayscale-400 hover:bg-grayscale-700/70 cursor-text active:brightness-90' onClick={handleFocusTextarea}>
      <VStack fullWidth spacing={16}>
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

        <HStack fullWidth justify='between'>
          <HStack spacing={8}>
            <ChatInputActionButton icon='plus' />
            <ChatInputActionButton icon='waypoints' />
          </HStack>

          <ChatInputActionButton icon='arrow-up' />
        </HStack>
      </VStack>
    </HStack>
  );
});

