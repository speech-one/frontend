'use client';

import { createContext, useContext } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { VStack } from '@/shared/components/layout';
import { Form } from '../Form';

interface FormTemplateContextValue {
  isLoading: boolean;
}

const FormTemplateContext = createContext<FormTemplateContextValue | undefined>(undefined);

interface FormTemplateProps<TFieldValues extends FieldValues = FieldValues> {
  children:   React.ReactNode;
  form:       UseFormReturn<TFieldValues>;
  onSubmit:   (data: TFieldValues) => Promise<void> | void;
  isLoading?: boolean;
  className?: string;
  style?:     React.CSSProperties;
}

export function FormTemplate<TFieldValues extends FieldValues = FieldValues>(props: FormTemplateProps<TFieldValues>) {
  const {
    children,
    form,
    onSubmit,
    isLoading = false,
    ...rest
  } = props;

  return (
    <FormTemplateContext.Provider value={{ isLoading }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full' {...rest}>
          <VStack fullWidth spacing={32}>
            {children}
          </VStack>
        </form>
      </Form>
    </FormTemplateContext.Provider>
  );
}

export function useFormTemplate() {
  const context = useContext(FormTemplateContext);

  if (context === undefined) {
    return { isLoading: false };
  }

  return context;
}

export * from './content';

