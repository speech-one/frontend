'use client';

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DropdownContext } from './context';

interface DropdownProps {
  children: ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState<{
    top: number; left: number; width: number; direction: 'up' | 'down';
  } | null>(null);

  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-dropdown-content]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current && isOpen) {
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const estimatedDropdownHeight = 300;
        const gap = 8;
        const spaceBelow = viewportHeight - rect.bottom;
        const direction = spaceBelow >= estimatedDropdownHeight + gap ? 'down' : 'up';

        const top = direction === 'down'
          ? rect.bottom + window.scrollY + gap
          : rect.top + window.scrollY - gap;

        setPosition({
          top:   top,
          left:  rect.right + window.scrollX,
          width: rect.width,
          direction,
        });
      }
    };

    if (isOpen) {
      updatePosition();

      window.addEventListener('scroll', updatePosition);

      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);

      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{
      isOpen, setIsOpen, triggerRef, position, setPosition,
    }}>
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export * from './action';
export * from './content';
export * from './context';
export * from './item';
