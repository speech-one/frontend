'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface HashRouterContextValue {
  currentTab:     string;
  currentSubPage: string | null;
  isModalOpen:    boolean;
  openModal:      (tab?: string, subPage?: string) => void;
  closeModal:     () => void;
  changeTab:      (tab: string, subPage?: string) => void;
  goBack:         () => void;
}

const HashRouterContext = createContext<HashRouterContextValue | undefined>(undefined);

export function SettingsHashRouter({ children }: {
  children: ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState('account');
  const [currentSubPage, setCurrentSubPage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      if (hash.startsWith('settings/')) {
        const path = hash.replace('settings/', '');
        const parts = path.split('/');

        setCurrentTab(parts[0] || 'account');

        setCurrentSubPage(parts[1] || null);

        setIsModalOpen(true);
      } else if (isModalOpen) {
        setIsModalOpen(false);

        setCurrentSubPage(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isModalOpen]);

  const openModal = (tab: string = 'account', subPage?: string) => {
    if (subPage) {
      window.location.hash = `settings/${tab}/${subPage}`;
    } else {
      window.location.hash = `settings/${tab}`;
    }
  };

  const closeModal = () => {
    window.location.hash = '';
  };

  const changeTab = (tab: string, subPage?: string) => {
    if (subPage) {
      window.location.hash = `settings/${tab}/${subPage}`;
    } else {
      window.location.hash = `settings/${tab}`;
    }
  };

  const goBack = () => {
    if (currentSubPage) {
      // 서브페이지에서 메인 페이지로
      window.location.hash = `settings/${currentTab}`;
    } else {
      // 메인 페이지에서 닫기
      closeModal();
    }
  };

  return (
    <HashRouterContext.Provider
      value={{
        currentTab,
        currentSubPage,
        isModalOpen,
        openModal,
        closeModal,
        changeTab,
        goBack,
      }}
    >
      {children}
    </HashRouterContext.Provider>
  );
}

export function useSettingsRouter() {
  const context = useContext(HashRouterContext);

  if (context === undefined) {
    throw new Error('useSettingsRouter must be used within a SettingsHashRouter');
  }

  return context;
}

