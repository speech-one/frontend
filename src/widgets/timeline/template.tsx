import { IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

interface TimelineTemplateProps {
  isOpen:      boolean;
  onClose:     () => void;
  title:       string;
  description: string;
  children:    React.ReactNode;
}

export function TimelineTemplate(props: TimelineTemplateProps) {
  const {
    isOpen: _isOpen,
    onClose,
    title,
    description,
    children,
  } = props;

  return (
    <VStack
      fullWidth
      fullHeight
      spacing={20}
      padding={[16, 20]}
      justify='start'
      align='start'
    >
      <HStack fullWidth justify='between' align='start'>
        <VStack spacing={8}>
          <Typography.Body>{title}</Typography.Body>
          <Typography.Label className='text-grayscale-400'>{description}</Typography.Label>
        </VStack>

        <IconButton
          icon='x'
          onClick={onClose}
        />
      </HStack>
      {children}
    </VStack>
  );
}
