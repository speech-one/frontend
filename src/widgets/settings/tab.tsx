'use client';

import { IconName } from 'lucide-react/dynamic';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { cn } from '@/shared/utils';
import { useSettingsRouter } from './hash-router';

interface SettingsTabProps {
  icon:  IconName;
  title: string;
  tabId: string;
}

export function SettingsTab(props: SettingsTabProps) {
  const {
    icon,
    title,
    tabId,
  } = props;

  const { currentTab, changeTab } = useSettingsRouter();  const isActive = currentTab === tabId;

  const handleClick = () => {
    changeTab(tabId);
  };

  return (
    <div onClick={handleClick} className={cn('w-full hover:bg-grayscale-700 active:bg-grayscale-600 rounded-[8px] transition-all duration-150 cursor-pointer select-none', isActive ? 'bg-grayscale-600' : '')}>
      <HStack fullWidth spacing={8} padding={[6, 8]} justify='start'>
        <Icon name={icon} size={20} className='text-grayscale-200' />
        <Typography.Label className='text-grayscale-200'>{title}</Typography.Label>
      </HStack>
    </div>
  );
}
