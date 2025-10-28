'use client';

import { HStack } from '@/shared/components/layout';
import { SettingsContent } from './content';
import { SettingsSidebar } from './sidebar';

export function SettingsWidget() {
  return (
    <HStack fullWidth height={600} className='bg-grayscale-800 rounded-[24px] overflow-hidden'>
      <SettingsSidebar />
      <SettingsContent />
    </HStack>
  );
}
