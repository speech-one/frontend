'use client';

import { Icon, Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { getSettingsPageById, getSettingsSubPageById } from './config';
import { useSettingsRouter } from './hash-router';

export function SettingsBreadcrumb() {
  const {
    currentTab,
    currentSubPage,
    goBack,
  } = useSettingsRouter();

  const pageConfig = getSettingsPageById(currentTab);
  const subPageConfig = currentSubPage ? getSettingsSubPageById(currentTab, currentSubPage) : null;

  if (!pageConfig) return null;

  return (
    <HStack
      fullWidth
      padding={[16, 24]}
      justify='start'
      className='border-b border-b-grayscale-700 bg-grayscale-800'
    >
      <HStack spacing={12} align='center'>
        {currentSubPage && (
          <button
            onClick={goBack}
            className='p-2 hover:bg-grayscale-700 active:bg-grayscale-600 rounded-[8px] transition-all duration-150'
          >
            <Icon name='arrow-left' size={20} className='text-grayscale-300' />
          </button>
        )}

        <HStack spacing={8} align='center'>
          <Typography.Label className='text-grayscale-300'>
            {pageConfig.title}
          </Typography.Label>

          {subPageConfig && (
            <>
              <Icon name='chevron-right' size={16} className='text-grayscale-500' />
              <Typography.Label className='text-grayscale-100'>
                {subPageConfig.title}
              </Typography.Label>
            </>
          )}
        </HStack>
      </HStack>
    </HStack>
  );
}

