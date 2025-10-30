import { cva } from 'class-variance-authority';
import { IconName } from 'lucide-react/dynamic';
import { Icon, Typography } from '@/shared/components/foundation';
import { HStack, SpacingValue } from '@/shared/components/layout';
import { cn } from '@/shared/utils';
import { useFormTemplate } from '../FormTemplate';

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

const buttonVariants = cva('rounded-[20px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer', {
  variants: {
    variant: {
      contained: 'bg-grayscale-100 hover:brightness-90 active:scale-95',
      outlined:  'bg-transparent border border-grayscale-100 hover:brightness-90 active:scale-95',
      text:      'bg-transparent hover:underline active:opacity-80',
    },
    theme: {
      monochrome:  '',
      destructive: '',
      warning:     '',
    },
  },
  compoundVariants: [
    {
      variant:   'contained',
      theme:     'monochrome',
      className: 'bg-grayscale-100',
    },
    {
      variant:   'contained',
      theme:     'destructive',
      className: 'bg-red-translucent',
    },
    {
      variant:   'contained',
      theme:     'warning',
      className: 'bg-yellow-translucent',
    },
    {
      variant:   'outlined',
      theme:     'destructive',
      className: 'bg-transparent border-red-solid text-red-solid',
    },
    {
      variant:   'outlined',
      theme:     'warning',
      className: 'bg-transparent border-yellow-solid text-yellow-solid',
    },
    {
      variant:   'text',
      theme:     'monochrome',
      className: 'bg-transparent hover:text-grayscale-200',
    },
    {
      variant:   'text',
      theme:     'destructive',
      className: 'bg-transparent hover:text-red-solid/80',
    },
    {
      variant:   'text',
      theme:     'warning',
      className: 'bg-transparent hover:text-yellow-solid/80',
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
      monochrome:  '',
      destructive: 'text-red-solid',
      warning:     'text-yellow-solid',
    },
  },
  compoundVariants: [
    {
      variant:   'text',
      theme:     'monochrome',
      className: 'text-grayscale-100',
    },
    {
      variant:   'contained',
      theme:     'monochrome',
      className: 'text-grayscale-800',
    },
    {
      variant:   'contained',
      theme:     'destructive',
      className: 'text-red-solid',
    },
    {
      variant:   'contained',
      theme:     'warning',
      className: 'text-yellow-solid',
    },
    {
      variant:   'text',
      theme:     'destructive',
      className: 'text-red-solid',
    },
    {
      variant:   'text',
      theme:     'warning',
      className: 'text-yellow-solid',
    },
  ],
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

  const TypographyComponent = typographyVariants[size];  const { isLoading: isFormLoading } = useFormTemplate();
  const isLoadingState = (isFormLoading && rest.type === 'submit') || isLoading;
  const isDisabled = isFormLoading || rest.disabled;

  return (
    <HStack as='button' spacing={spacingVariants[size]} padding={paddingVariants[size]} className={buttonVariants({
      variant, theme,
    })} type='button' fullWidth={fullWidth} disabled={isDisabled} {...rest} justify='center'>
      {isLoadingState && <Icon name='loader-circle' size={iconSizeVariants[size]} className={cn('animate-spin', textVariants({
        variant, theme,
      }))} />}
      {(leadingIcon && !isLoadingState) && <Icon name={leadingIcon} size={iconSizeVariants[size]} className={textVariants({
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
