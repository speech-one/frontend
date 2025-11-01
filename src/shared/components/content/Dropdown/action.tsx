import React from 'react';
import { useDropdown } from './context';

interface DropdownActionProps {
  children: React.ReactNode;
}

export function DropdownAction({ children }: DropdownActionProps) {
  const {
    setIsOpen,
    isOpen,
    triggerRef,
  } = useDropdown();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={triggerRef as unknown as React.RefObject<HTMLDivElement>}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
