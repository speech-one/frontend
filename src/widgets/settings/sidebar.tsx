'use client';

import { VStack } from '@/shared/components/layout';
import { SETTINGS_PAGES } from './config';
import { SettingsHeader } from './header';
import { SettingsTab } from './tab';

export function SettingsSidebar() {
  return (
    <VStack
      width={200}
      fullHeight
      className='bg-grayscale-800 border-r border-r-grayscale-600'
      justify='start'
      spacing={10}>
      <SettingsHeader />

      <VStack fullWidth spacing={6} padding={[0, 8]}>
        {SETTINGS_PAGES.map(page => (
          <SettingsTab
            key={page.id}
            icon={page.icon}
            title={page.title}
            tabId={page.id}
          />
        ))}
      </VStack>
    </VStack>
  );
}
