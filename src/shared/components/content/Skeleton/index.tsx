'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';

const skeletonVariants = cva('animate-pulse bg-gradient-to-r from-grayscale-700 via-grayscale-600 to-grayscale-700 bg-[length:200%_100%]',
  {
    variants: { variant: {
      rectangular: 'rounded-[4px]',
      circular:    'rounded-full',
      rounded:     'rounded-[8px]',
    } },
    defaultVariants: { variant: 'rectangular' },
  });

interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?:     number | string;
  height?:    number | string;
  className?: string;
}

export function Skeleton(props: SkeletonProps) {
  const {
    variant,
    width,
    height,
    className,
  } = props;

  const style = {
    width:  typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      style={style}
    />
  );
}

