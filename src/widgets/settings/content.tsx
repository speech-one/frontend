'use client';

import { VStack } from '@/shared/components/layout';
import { DEFAULT_SETTINGS_PAGE, getSettingsPageById, getSettingsSubPageById } from './config';
import { useSettingsRouter } from './hash-router';
import { SettingsTemplate } from './template';

export function SettingsContent() {
  const { currentTab, currentSubPage } = useSettingsRouter();  const pageConfig = getSettingsPageById(currentTab) || DEFAULT_SETTINGS_PAGE;

  let PageComponent;
  let pageKey;

  if (currentSubPage) {
    const subPageConfig = getSettingsSubPageById(currentTab, currentSubPage);

    if (subPageConfig) {
      PageComponent = subPageConfig.component;

      pageKey = `${pageConfig.id}-${subPageConfig.id}`;
    } else {
      PageComponent = pageConfig.component;

      pageKey = pageConfig.id;
    }
  } else {
    PageComponent = pageConfig.component;

    pageKey = pageConfig.id;
  }

  return (
    <VStack fullWidth fullHeight padding={[16, 20]}>
      <SettingsTemplate pageKey={pageKey}>
        <PageComponent />
      </SettingsTemplate>
    </VStack>
  );
}
