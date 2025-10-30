import React, { useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '../content';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../content/Form';
import { Icon } from '../foundation';
import { VStack } from '../layout';

interface FormInputFieldProps<TFieldValues extends FieldValues> extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  name:         FieldPath<TFieldValues>;
  label:        string;
  placeholder?: string;
  required?:    boolean;
  control:      Control<TFieldValues>;
}

export function FormInputField<TFieldValues extends FieldValues>(props: FormInputFieldProps<TFieldValues>) {
  const {
    name,
    label,
    placeholder,
    required = false,
    control,
    type,
    ...rest
  } = props;

  const isPasswordInput = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
              <Input
                fullWidth
                placeholder={placeholder}
                endIcon={isPasswordInput ? (isPasswordVisible ? 'eye-off' : 'eye') : undefined}
                onEndIconClick={isPasswordInput ? handlePasswordVisibility : undefined}
                {...rest}
                {...field}
                type={isPasswordInput ? (isPasswordVisible ? 'text' : 'password') : type}
              />
            </FormControl>
          </VStack>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
