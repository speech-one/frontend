import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { cn } from '@/shared/utils';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  className?:   string;
}

const dividerVariants = cva('bg-grayscale-800 rounded-full', {
  variants: { orientation: {
    horizontal: 'w-full h-[1px]',
    vertical:   'w-[1px] h-full',
  } },
  defaultVariants: { orientation: 'horizontal' },
});

export function Divider(props: DividerProps) {
  const {
    orientation = 'horizontal',
    className,
    ...rest
  } = props;

  const dividerClass = dividerVariants({ orientation });
  const dividerClasses = cn(dividerClass, className);

  return (
    <div className={dividerClasses} {...rest} />
  );
}
