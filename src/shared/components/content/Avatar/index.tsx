'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { Icon } from '@/shared/components/foundation';
import { cn } from '@/shared/utils';
import { Skeleton } from '../Skeleton';

const avatarVariants = cva('relative inline-flex items-center justify-center overflow-hidden bg-grayscale-800 text-grayscale-300',
  {
    variants: { shape: {
      circle: 'rounded-full',
      square: 'rounded-[8px]',
    } },
    defaultVariants: { shape: 'circle' },
  });

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?:       string;
  alt?:       string;
  fallback?:  string;
  loading?:   boolean;
  size?:      number;
  className?: string;
}

export function Avatar(props: AvatarProps) {
  const {
    src,
    alt = 'Avatar',
    fallback,
    loading = false,
    size = 40,
    shape,
    className,
  } = props;

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const iconSize = Math.floor(size * 0.5);

  const containerStyle = {
    width:  `${size}px`,
    height: `${size}px`,
  };

  if (loading) {
    return (
      <Skeleton
        variant={shape === 'square' ? 'rounded' : 'circular'}
        width={size}
        height={size}
        className={className}
      />
    );
  }

  if (src && !imageError) {
    return (
      <div
        className={cn(avatarVariants({ shape }), className)}
        style={containerStyle}
      >
        {imageLoading && (
          <Skeleton
            variant={shape === 'square' ? 'rounded' : 'circular'}
            width={size}
            height={size}
            className='absolute inset-0'
          />
        )}
        <img
          src={src}
          alt={alt}
          className={cn('absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            imageLoading ? 'opacity-0' : 'opacity-100')}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);

            setImageLoading(false);
          }}
        />
      </div>
    );
  }

  if (fallback) {
    return (
      <div
        className={cn(avatarVariants({ shape }), className)}
        style={containerStyle}
      >
        <span className='font-medium uppercase' style={{ fontSize: `${size * 0.4}px` }}>
          {fallback}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(avatarVariants({ shape }), className)}
      style={containerStyle}
    >
      <Icon name='user' size={iconSize} />
    </div>
  );
}

