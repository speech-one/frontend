import { VStack } from '@/shared/components/layout';

interface FormTemplateContentProps {
  children: React.ReactNode;
}

export function FormTemplateContent(props: FormTemplateContentProps) {
  const { children } = props;

  return (
    <VStack fullWidth spacing={24}>
      {children}
    </VStack>
  );
}
