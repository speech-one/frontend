import { VStack } from '@/shared/components/layout';
import { ChatInput } from '@/widgets/chat';

export default function ChatPage() {
  return (
    <VStack fullWidth fullHeight justify='end' padding={[20, 16]}>
      <ChatInput />
    </VStack>
  );
}
