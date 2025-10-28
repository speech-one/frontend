import { IconName } from 'lucide-react/dynamic';
import { ComponentType } from 'react';
import AccountPage from './pages/account';
import AccountEditPage from './pages/account-edit';
import MCPPage from './pages/mcp';
import SystemPromptPage from './pages/system-prompt';
import UsagePage from './pages/usage';

export interface SettingsSubPageConfig {
  id:          string;
  title:       string;
  description: string;
  component:   ComponentType;
}

export interface SettingsPageConfig {
  id:          string;
  title:       string;
  icon:        IconName;
  description: string;
  component:   ComponentType;
  subPages?:   SettingsSubPageConfig[];
}

export const SETTINGS_PAGES: SettingsPageConfig[] = [
  {
    id:          'account',
    title:       '계정',
    icon:        'circle-user-round',
    description: '사용자 계정의 기본 정보입니다.',
    component:   AccountPage,
    subPages:    [
      {
        id:          'edit',
        title:       '수정',
        description: '사용자 계정의 기본 정보를 수정합니다.',
        component:   AccountEditPage,
      },
    ],
  },
  {
    id:          'system-prompt',
    title:       '시스템 프롬프트',
    icon:        'git-compare',
    description: '사용자의 커스텀 시스템 프롬프트를 설정할 수 있습니다.',
    component:   SystemPromptPage,
  },
  {
    id:          'usage',
    title:       '사용량',
    icon:        'leaf',
    description: 'AI 사용량을 표시해줍니다.',
    component:   UsagePage,
  },
  {
    id:          'mcp',
    title:       'MCP',
    icon:        'monitor-down',
    description: '커스텀 MCP를 연결할 수 있습니다.',
    component:   MCPPage,
  },
];

export const getSettingsPageById = (id: string): SettingsPageConfig | undefined => {
  return SETTINGS_PAGES.find(page => page.id === id);
};

export const getSettingsSubPageById = (pageId: string, subPageId: string): SettingsSubPageConfig | undefined => {
  const page = getSettingsPageById(pageId);

  return page?.subPages?.find(subPage => subPage.id === subPageId);
};

export const DEFAULT_SETTINGS_PAGE = SETTINGS_PAGES[0];

