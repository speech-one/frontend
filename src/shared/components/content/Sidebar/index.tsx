'use client';

import { AnimatedVStack, HStack, VStack } from '@/shared/components/layout';
import { SidebarProvider, useSidebar } from './context';
import { SidebarGroup } from './group';
import { SidebarHeader } from './header';
import { SidebarItem } from './item';

function SidebarContent() {
  const { isOpen } = useSidebar();

  return (
    <HStack fullHeight padding={4} className='bg-transparent'>
      <AnimatedVStack
        initial={{ width: isOpen ? 300 : 64 }}
        animate={{ width: isOpen ? 300 : 64 }}
        transition={{
          duration: 0.3,
          ease:     'easeInOut',
        }}
        fullHeight
        justify='between'
        padding={12}
        className='bg-grayscale-900 rounded-[12px] overflow-hidden'
      >
        <VStack spacing={12} fullWidth>
          <SidebarHeader />

          <VStack fullWidth spacing={24}>
            <VStack spacing={4} fullWidth>
              <SidebarItem icon='message-square-plus' title='새로운 채팅' href='/chats/new' />
              <SidebarItem icon='search' title='검색' href='/search' />
            </VStack>

            <SidebarGroup title='작업 목록'>
              <SidebarItem icon='file' title='Perplexity에 대한 질문' href='/chats/new' />
              <SidebarItem icon='file' title='Next.js에 대한 질문 ㅁ어ㅏ림너이;라ㅓㅁㄴㅇ;ㅣ럼;ㄴ이러밍널ㄴ' href='/search' />
            </SidebarGroup>
          </VStack>
        </VStack>
      </AnimatedVStack>
    </HStack>
  );
}

export function Sidebar() {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
}
