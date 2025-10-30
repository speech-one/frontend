'use client';

import { useRef, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Avatar, IconButton } from '../content';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../content/Form';
import { Icon } from '../foundation';
import { HStack, VStack } from '../layout';

interface FormAvatarFieldProps<TFieldValues extends FieldValues> {
  name:      FieldPath<TFieldValues>;
  label:     string;
  required?: boolean;
  control:   Control<TFieldValues>;
  size?:     number;
  shape?:    'circle' | 'square';
  fallback?: string;
}

export function FormAvatarField<TFieldValues extends FieldValues>(props: FormAvatarFieldProps<TFieldValues>) {
  const {
    name,
    label,
    required = false,
    control,
    size = 100,
    shape = 'circle',
    fallback,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null, onChange: (value: File | null) => void) => {
    if (file) {
      const reader = new FileReader;

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);

      onChange(file);
    } else {
      setPreviewUrl(null);

      onChange(null);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const currentValue = field.value as File | string | null | undefined;

        // field.value가 File이 아닌 경우 (예: 기존 URL)
        const displayUrl = currentValue instanceof File
          ? previewUrl
          : typeof currentValue === 'string' && currentValue.length > 0
            ? currentValue
            : previewUrl;

        return (
          <FormItem className='space-y-1 rounded-md w-full'>
            <VStack fullWidth spacing={8}>
              <FormLabel>
                {label}

                {required &&
                  <Icon name='asterisk' size={12} className='text-red-solid' />
                }
              </FormLabel>

              <FormControl className={'w-full'}>
                <HStack spacing={16} align='center'>
                  <div className='relative group cursor-pointer' onClick={() => fileInputRef.current?.click()}>
                    <Avatar
                      src={displayUrl || undefined}
                      fallback={fallback}
                      size={size}
                      shape={shape}
                    />

                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full'>
                      <Icon name='upload' size={24} className='text-grayscale-100' />
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={e => {
                      const file = e.target.files?.[0] || null;

                      handleFileSelect(file, field.onChange);
                    }}
                  />

                  {currentValue && (
                    <IconButton
                      icon='x'
                      theme='destructive'
                      size='small'
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }

                        setPreviewUrl(null);

                        field.onChange(null);
                      }}
                      className='cursor-pointer'
                    />
                  )}
                </HStack>
              </FormControl>
            </VStack>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

