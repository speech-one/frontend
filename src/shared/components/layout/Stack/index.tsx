import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils';

export type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;

type StackTag = 'div' | 'section' | 'span' | 'p' | 'article' | 'main' | 'button';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  spacing?:    SpacingValue;
  align?:      'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?:    'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?:       boolean;
  padding?:    SpacingValue | [SpacingValue, SpacingValue] | [SpacingValue, SpacingValue, SpacingValue, SpacingValue];
  direction:   'horizontal' | 'vertical';
  fullWidth?:  boolean;
  fullHeight?: boolean;
  width?:      number | string;
  height?:     number | string;
  className?:  string;
  as?:         StackTag;
  children?:   ReactNode;
}

export function Stack(props: StackProps) {
  const {
    spacing = 0,
    align,
    justify,
    wrap = false,
    padding = 0,
    direction,
    fullWidth = false,
    fullHeight = false,
    width,
    height,
    className,
    style,
    as: Component = 'div',
    children,
    ...rest
  } = props;

  const getPaddingStyle = () => {
    if (typeof padding === 'number') {
      return { padding };
    }

    if (Array.isArray(padding)) {
      if (padding.length === 2) {
        const [vertical, horizontal] = padding;

        return {
          paddingTop:    vertical,
          paddingBottom: vertical,
          paddingLeft:   horizontal,
          paddingRight:  horizontal,
        };
      }

      if (padding.length === 4) {
        const [
          top, right, bottom, left,
        ] = padding;

        return {
          paddingTop:    top,
          paddingRight:  right,
          paddingBottom: bottom,
          paddingLeft:   left,
        };
      }
    }

    return {};
  };

  const getAlignClass = () => {
    const alignMap = {
      start:    'items-start',
      center:   'items-center',
      end:      'items-end',
      stretch:  'items-stretch',
      baseline: 'items-baseline',
    };

    return align ? alignMap[align] : direction === 'horizontal' ? 'items-center' : 'items-start';
  };

  const getJustifyClass = () => {
    const justifyMap = {
      start:   'justify-start',
      center:  'justify-center',
      end:     'justify-end',
      between: 'justify-between',
      around:  'justify-around',
      evenly:  'justify-evenly',
    };

    return justify ? justifyMap[justify] : direction === 'horizontal' ? 'justify-start' : 'justify-center';
  };

  return (
    <Component
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        fullWidth ? 'w-full' : 'w-fit',
        fullHeight ? 'h-full' : 'h-fit',
        getAlignClass(),
        getJustifyClass(),
        className,
      )}
      style={{
        gap:    spacing,
        width:  typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...getPaddingStyle(),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export * from './animated';

