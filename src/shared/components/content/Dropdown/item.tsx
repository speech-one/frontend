import { IconName } from 'lucide-react/dynamic';
import React from 'react';
import { Icon } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { cn } from '@/shared/utils';
import { useDropdown } from './context';

interface DropdownItemProps {
  children?:  React.ReactNode;
  icon?:      IconName;
  label?:     string;
  onClick?:   () => void;
  className?: string;
}

export function DropdownItem({
  children,
  icon,
  label,
  onClick,
  className,
}: DropdownItemProps) {
  const { setIsOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement = target.closest('button, [role="switch"], input, select, textarea');

    if (isInteractiveElement) {
      return;
    }

    onClick?.();

    setIsOpen(false);
  };

  return (
    <HStack
      fullWidth
      justify="between"
      align="center"
      padding={[10, 8]}
      onClick={handleClick}
      className={cn('hover:bg-grayscale-700 transition-colors cursor-pointer',
        className)}
    >
      <HStack spacing={8}>
        {icon && <Icon name={icon} size={20} />}
        {label && <span className="text-grayscale-100 text-body">{label}</span>}
      </HStack>

      {children && (
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
      )}
    </HStack>
  );
}
