import React from 'react';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

interface FormFieldProps {
  label:       string;
  error?:      string;
  helperText?: string;
  width?:      number;
  required?:   boolean;
  children:    React.ReactNode;
}

export function FormField(props: FormFieldProps) {
  const {
    label,
    error,
    helperText,
    children,
    width,
    required,
  } = props;

  return (
    <VStack fullWidth spacing={6} align='start' width={width}>
      <HStack spacing={2}>
        <Typography.Label className='text-grayscale-300'>{label}
        </Typography.Label>

        {
          required && <Icon name='asterisk' size={16} className='text-red-solid' />
        }
      </HStack>
      {children}
      {error && <Typography.Label className='text-red-solid'>{error}</Typography.Label>}
      {helperText && <Typography.Label className='text-grayscale-400'>{helperText}</Typography.Label>}
    </VStack>
  );
}
