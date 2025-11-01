'use client';

import {
  type TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  Chip,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  Switch,
} from '@/shared/components/content';
import {
  FormControl,
  FormField as RHFFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/content/Form';
import { FormSwitchField } from '@/shared/components/form';
import { Icon } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { ChatInputActionButton } from './action-button';

export interface ChatInputProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  name?:          FieldPath<TFieldValues>;
  label?:         string;
  required?:      boolean;
  control?:       Control<TFieldValues>;
  fullWidth?:     boolean;
  height?:        number | string;
  files?:         File[];
  onFilesChange?: (files: File[]) => void;
  value?:         string;
  onChange?:      (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ChatInput = <TFieldValues extends FieldValues = FieldValues>(
  props: ChatInputProps<TFieldValues>,
) => {
  const {
    name,
    label,
    placeholder = '메시지를 입력하세요.',
    required = false,
    control,
    fullWidth = true,
    height,
    files = [],
    onFilesChange,
    value,
    onChange,
    ...rest
  } = props;

  const innerRef = useRef<HTMLTextAreaElement>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>(files);

  useEffect(() => {
    setInternalFiles(files);
  }, [files]);

  const handleFocusTextarea = () => {
    innerRef.current?.focus();
  };

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    if (!textarea || height) return;

    textarea.style.height = 'auto';

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 22.4;
    const maxHeight = lineHeight * 3;
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight <= maxHeight) {
      textarea.style.height = `${scrollHeight}px`;

      textarea.style.overflowY = 'hidden';
    } else {
      textarea.style.height = `${maxHeight}px`;

      textarea.style.overflowY = 'auto';
    }
  };

  useEffect(() => {
    const textarea = innerRef.current;

    if (textarea) {
      adjustHeight(textarea);
    }
  }, [height]);

  const handleFileSelect = (newFiles: File[]) => {
    const updatedFiles = [...internalFiles, ...newFiles];

    setInternalFiles(updatedFiles);

    onFilesChange?.(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = internalFiles.filter((_, i) => i !== index);

    setInternalFiles(updatedFiles);

    onFilesChange?.(updatedFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight(e.target);

    onChange?.(e);
  };

  const textareaContent = (
    <HStack fullWidth={fullWidth} spacing={8} padding={[20, 16]} className='bg-grayscale-700 text-grayscale-100 rounded-[16px] border border-grayscale-600 overflow-hidden transition-all duration-150 hover:border-grayscale-400 hover:bg-grayscale-700/70 cursor-text active:brightness-90' onClick={handleFocusTextarea}>
      <VStack fullWidth spacing={16}>
        <VStack fullWidth spacing={8}>
          {internalFiles.length > 0 && (
            <div className='w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              <HStack spacing={8} className='flex-nowrap'>
                {internalFiles.map((file, index) => (
                  <Chip
                    key={`${file.name}-${index}`}
                    label={file.name}
                    icon='file'
                    onRemove={() => handleRemoveFile(index)}
                  />
                ))}
              </HStack>
            </div>
          )}
          <textarea
            ref={innerRef}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className='w-full bg-transparent outline-none placeholder:text-grayscale-300 placeholder:text-body placeholder:font-body placeholder:tracking-[-0.04em] placeholder:leading-[140%] resize-none'
            style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
            {...rest}
          />
        </VStack>

        <HStack fullWidth justify='between'>
          <HStack spacing={8}>
            <ChatInputActionButton
              icon='plus'
              type='file'
              onFileSelect={handleFileSelect}
            />

            <Dropdown>
              <DropdownAction>
                <ChatInputActionButton icon='waypoints' />
              </DropdownAction>

              <DropdownContent>
                <DropdownItem label='Anthropic' icon='link'>
                  {control && name
                    ? (
                      <FormSwitchField
                        name={`${name}_anthropic` as FieldPath<TFieldValues>}
                        label=''
                        control={control}
                        hideLabel
                        size='sm'
                        className="w-fit"
                      />
                    )
                    : (
                      <Switch
                        checked={false}
                        onChange={() => {

                        }}
                        size='sm'
                      />
                    )}
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </HStack>

          <ChatInputActionButton icon='arrow-up' />
        </HStack>
      </VStack>
    </HStack>
  );

  if (control && name) {
    return (
      <RHFFormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='space-y-1 rounded-md w-full'>
            <VStack fullWidth spacing={8}>
              {label && (
                <FormLabel>
                  {label}
                  {required &&
                    <Icon name='asterisk' size={12} className='text-red-solid' />
                  }
                </FormLabel>
              )}

              <FormControl className='w-full'>
                <HStack fullWidth={fullWidth} spacing={8} padding={[20, 16]} className='bg-grayscale-700 text-grayscale-100 rounded-[16px] border border-grayscale-600 overflow-hidden transition-all duration-150 hover:border-grayscale-400 hover:bg-grayscale-700/70 cursor-text active:brightness-90' onClick={handleFocusTextarea}>
                  <VStack fullWidth spacing={16}>
                    <VStack fullWidth spacing={8}>
                      {internalFiles.length > 0 && (
                        <div className='w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                          <HStack spacing={8} className='flex-nowrap'>
                            {internalFiles.map((file, index) => (
                              <Chip
                                key={`${file.name}-${index}`}
                                label={file.name}
                                icon='file'
                                onRemove={() => handleRemoveFile(index)}
                              />
                            ))}
                          </HStack>
                        </div>
                      )}
                      <textarea
                        ref={node => {
                          innerRef.current = node;

                          field.ref(node);
                        }}
                        placeholder={placeholder}
                        className='w-full bg-transparent outline-none placeholder:text-grayscale-300 placeholder:text-body placeholder:font-body placeholder:tracking-[-0.04em] placeholder:leading-[140%] resize-none'
                        style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
                        {...rest}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={e => {
                          adjustHeight(e.target);

                          field.onChange(e);
                        }}
                      />
                    </VStack>

                    <HStack fullWidth justify='between'>
                      <HStack spacing={8}>
                        <ChatInputActionButton
                          icon='plus'
                          type='file'
                          onFileSelect={handleFileSelect}
                        />
                        <ChatInputActionButton icon='waypoints' />
                      </HStack>

                      <ChatInputActionButton icon='arrow-up' />
                    </HStack>
                  </VStack>
                </HStack>
              </FormControl>
            </VStack>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return textareaContent;
};

