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
  params:         Record<string, string>;
  isModalOpen:    boolean;
  openModal:      (tab?: string, subPage?: string, params?: Record<string, string>) => void;
  closeModal:     () => void;
  changeTab:      (tab: string, subPage?: string, params?: Record<string, string>) => void;
  goBack:         () => void;
}

const HashRouterContext = createContext<HashRouterContextValue | undefined>(undefined);

export function SettingsHashRouter({ children }: {
  children: ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState('account');
  const [currentSubPage, setCurrentSubPage] = useState<string | null>(null);
  const [params, setParams] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      if (hash.startsWith('settings/')) {
        const path = hash.replace('settings/', '');
        const parts = path.split('/');

        setCurrentTab(parts[0] || 'account');

        if (parts.length > 1) {
          const subPagePath = parts.slice(1).join('/');

          setCurrentSubPage(subPagePath);

          const extractedParams: Record<string, string> = {};

          if (parts.length > 2) {
            extractedParams.id = parts[2];

            for (let i = 3; i < parts.length; i += 2) {
              if (parts[i + 1]) {
                extractedParams[parts[i]] = parts[i + 1];
              }
            }
          }

          setParams(extractedParams);
        } else {
          setCurrentSubPage(null);

          setParams({});
        }

        setIsModalOpen(true);
      } else if (isModalOpen) {
        setIsModalOpen(false);

        setCurrentSubPage(null);

        setParams({});
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isModalOpen]);

  const buildHash = (tab: string, subPage?: string, routeParams?: Record<string, string>) => {
    if (subPage) {
      if (routeParams && Object.keys(routeParams).length > 0) {
        const paramValues = Object.values(routeParams);

        return `settings/${tab}/${subPage}/${paramValues.join('/')}`;
      }

      return `settings/${tab}/${subPage}`;
    }

    return `settings/${tab}`;
  };

  const openModal = (tab: string = 'account', subPage?: string, routeParams?: Record<string, string>) => {
    window.location.hash = buildHash(tab, subPage, routeParams);
  };

  const closeModal = () => {
    window.location.hash = '';
  };

  const changeTab = (tab: string, subPage?: string, routeParams?: Record<string, string>) => {
    window.location.hash = buildHash(tab, subPage, routeParams);
  };

  const goBack = () => {
    if (currentSubPage) {
      window.location.hash = `settings/${currentTab}`;
    } else {
      closeModal();
    }
  };

  return (
    <HashRouterContext.Provider
      value={{
        currentTab,
        currentSubPage,
        params,
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

