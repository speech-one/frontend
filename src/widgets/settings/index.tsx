'use client';

import { HStack } from '@/shared/components/layout';
import { SettingsContent } from './content';
import { SettingsSidebar } from './sidebar';

export function SettingsWidget() {
  return (
    <HStack fullWidth height={600} className='bg-grayscale-800 rounded-[24px] overflow-hidden'>
      <SettingsSidebar />
      <div className='flex-1 overflow-y-auto min-h-0 h-full w-full max-w-full max-h-full flex flex-col justify-start items-start'>
        <SettingsContent />
      </div>
    </HStack>
  );
}
