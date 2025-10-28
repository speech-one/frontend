'use client';

import { AnimatedVStack, HStack } from '@/shared/components/layout';
import { SidebarProvider, useSidebar } from './context';
import { SidebarHeader } from './header';

function SidebarContent() {
  const { isOpen } = useSidebar();

  return (
    <HStack fullHeight padding={4} className='bg-grayscale-800'>
      <AnimatedVStack
        initial={{ width: 64 }}
        animate={{
          width:         isOpen ? 300 : 64,
          paddingTop:    isOpen ? 12 : 8,
          paddingBottom: isOpen ? 12 : 8,
          paddingLeft:   isOpen ? 12 : 8,
          paddingRight:  isOpen ? 12 : 8,
        }}
        transition={{
          duration: 0.3,
          ease:     'easeInOut',
        }}
        fullHeight
        justify='between'
        className='bg-grayscale-900 rounded-[12px] overflow-hidden'
      >
        <SidebarHeader />
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
