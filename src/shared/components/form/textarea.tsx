import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Textarea } from '../content';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../content/Form';
import { Icon } from '../foundation';
import { VStack } from '../layout';

interface FormTextareaFieldProps<TFieldValues extends FieldValues> extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
  name:         FieldPath<TFieldValues>;
  label:        string;
  placeholder?: string;
  required?:    boolean;
  control:      Control<TFieldValues>;
  height?:      number | string;
}

export function FormTextareaField<TFieldValues extends FieldValues>(props: FormTextareaFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    required = false,
    control,
    height,
    ...rest
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-1 rounded-md w-full'>
          <VStack fullWidth spacing={8}>
            <FormLabel>
              {label}

              {required &&
                <Icon name='asterisk' size={12} className='text-red-solid' />
              }
            </FormLabel>

            <FormControl className={'w-full'}>
              <Textarea
                fullWidth
                placeholder={placeholder}
                height={height}
                {...rest}
                {...field}
              />
            </FormControl>
          </VStack>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

