'use client';

import { Panel } from '@/shared/components/content';
import { SettingsUnifiedModal } from '@/widgets/settings/unified-modal';
import { SidebarWidget } from '@/widgets/sidebar';

export default function DashboardLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-row gap-0 h-full bg-grayscale-800 w-full'>
      <SidebarWidget />
      <div className='flex-1 overflow-y-auto min-h-0 w-full'>
        {children}
      </div>
      <Panel />
      <SettingsUnifiedModal />
    </div>
  );
}
