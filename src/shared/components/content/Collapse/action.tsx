import { type ReactNode } from 'react';
import { useCollapse } from './context';

interface CollapseActionProps {
  children: ReactNode;
}

export function CollapseAction({ children }: CollapseActionProps) {
  const { toggle } = useCollapse();

  return (
    <div
      onClick={toggle}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

