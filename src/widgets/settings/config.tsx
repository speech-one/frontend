import { IconName } from 'lucide-react/dynamic';
import { ComponentType } from 'react';
import AccountPage from './pages/account';
import AccountEditPage from './pages/account-edit';
import BasePromptPage from './pages/base-prompt';
import McpPage from './pages/mcp';
import AddMcpPage from './pages/mcp-add';
import EditMcpPage from './pages/mcp-edit';
import UsagePage from './pages/usage';

export interface SettingsSubPageConfig {
  id:          string;
  title:       string;
  description: string;
  component:   ComponentType;
  dynamic?:    boolean; // 동적 라우트 여부 (예: edit/:id)
  pattern?:    string; // 동적 라우트 패턴 (예: 'edit/:id')
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
    id:          'base-prompt',
    title:       '기본 프롬프트',
    icon:        'git-compare',
    description: '사용자의 커스텀 시스템 프롬프트를 설정할 수 있습니다.',
    component:   BasePromptPage,
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
    component:   McpPage,
    subPages:    [
      {
        id:          'add',
        title:       'MCP 등록',
        description: '커스텀 MCP를 JSON 형태로 등록하세요.',
        component:   AddMcpPage,
      },
      {
        id:          'edit',
        title:       'MCP 수정',
        description: '커스텀 MCP를 JSON 형태로 수정하세요.',
        component:   EditMcpPage,
        dynamic:     true,
        pattern:     'edit/:id',
      },
    ],
  },
];

export const getSettingsPageById = (id: string): SettingsPageConfig | undefined => {
  return SETTINGS_PAGES.find(page => page.id === id);
};

export const getSettingsSubPageById = (pageId: string, subPagePath: string): SettingsSubPageConfig | undefined => {
  const page = getSettingsPageById(pageId);

  if (!page?.subPages) {
    return undefined;
  }

  // 먼저 정확한 매칭 시도
  const exactMatch = page.subPages.find(subPage => subPage.id === subPagePath);

  if (exactMatch) {
    return exactMatch;
  }

  // 동적 라우트 패턴 매칭 시도
  return page.subPages.find(subPage => {
    if (subPage.dynamic && subPage.pattern) {
      // 패턴을 정규식으로 변환 (예: 'edit/:id' -> '^edit/(.+)$')
      const regexPattern = subPage.pattern.replace(/:[^/]+/g, '([^/]+)');
      const regex = new RegExp(`^${regexPattern}$`);

      return regex.test(subPagePath);
    }

    return false;
  });
};

export const DEFAULT_SETTINGS_PAGE = SETTINGS_PAGES[0];

