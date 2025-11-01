import { Typography } from '@/shared/components/foundation';
import { VStack } from '@/shared/components/layout';
import { ChatInput } from '@/widgets/chat';

export default function ChatPage() {
  return (
    <VStack fullWidth fullHeight padding={[20, 16]}>
      <VStack fullWidth fullHeight justify='start'>
        <Typography.Title>채팅방 이름</Typography.Title>
      </VStack>

      <ChatInput />
    </VStack>
  );
}
