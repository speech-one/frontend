import { cva } from 'class-variance-authority';
import { IconName } from 'lucide-react/dynamic';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, SpacingValue } from '@/shared/components/layout';
import { cn } from '@/shared/utils';

interface ButtonProps extends React.ComponentProps<'button'> {
  children:      string;
  fullWidth?:    boolean;
  size?:         'sm' | 'md' | 'lg';
  variant?:      'contained' | 'outlined' | 'text';
  leadingIcon?:  IconName;
  trailingIcon?: IconName;
  isLoading?:    boolean;
  theme?:        'monochrome' | 'destructive' | 'warning';
}

const buttonVariants = cva('rounded-[20px] bg-grayscale-100 hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer', {
  variants: {
    variant: {
      contained: 'bg-grayscale-100 hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      outlined:  'bg-transparent border border-grayscale-100 hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-grayscale-100',
      text:      'bg-transparent hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    },
    theme: {
      monochrome:  'bg-grayscale-100 hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      destructive: 'bg-red-translucent hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      warning:     'bg-yellow-translucent hover:brightness-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    },
  },
  compoundVariants: [
    {
      variant:   'outlined',
      theme:     'destructive',
      className: 'bg-red-translucent text-red-solid border-red-solid',
    },
  ],
});

const paddingVariants: Record<NonNullable<ButtonProps['size']>, [SpacingValue, SpacingValue]> = {
  sm: [8, 12],
  md: [12, 16],
  lg: [12, 20],
};

const textVariants = cva('text-grayscale-100', {
  variants: {
    variant: {
      contained: 'text-grayscale-800',
      outlined:  'text-grayscale-100',
      text:      'text-grayscale-100',
    },
    theme: {
      monochrome:  'text-grayscale-800',
      destructive: 'text-red-solid',
      warning:     'text-yellow-solid',
    },
  },
  defaultVariants: { theme: 'monochrome' },
});

const typographyVariants: Record<NonNullable<ButtonProps['size']>, React.ElementType> = {
  sm: Typography.Label,
  md: Typography.Body,
  lg: Typography.Body,
};

const iconSizeVariants: Record<NonNullable<ButtonProps['size']>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const spacingVariants: Record<NonNullable<ButtonProps['size']>, SpacingValue> = {
  sm: 4,
  md: 8,
  lg: 12,
};

export function Button(props: ButtonProps) {
  const {
    children,
    fullWidth = false,
    size = 'md',
    variant = 'contained',
    leadingIcon,
    trailingIcon,
    isLoading = false,
    theme = 'monochrome',
    ...rest
  } = props;

  const TypographyComponent = typographyVariants[size];

  return (
    <HStack as='button' spacing={spacingVariants[size]} padding={paddingVariants[size]} className={buttonVariants({
      variant, theme,
    })} type='button' fullWidth={fullWidth} disabled={isLoading} {...rest} justify='center'>
      {isLoading && <Icon name='loader-circle' size={iconSizeVariants[size]} className={cn('animate-spin', textVariants({
        variant, theme,
      }))} />}
      {(leadingIcon && !isLoading) && <Icon name={leadingIcon} size={iconSizeVariants[size]} className={textVariants({
        variant, theme,
      })} />}
      <TypographyComponent className={textVariants({
        variant, theme,
      })}>{children}</TypographyComponent>
      {trailingIcon && <Icon name={trailingIcon} size={iconSizeVariants[size]} className={textVariants({
        variant, theme,
      })} />}
    </HStack>
  );
}
