import clsx from 'clsx';
import { Skeleton } from '@/shared/components/content';
import { TypographyType } from './shared';

interface TypographyBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  type:      TypographyType;
  width?:    number;
}

const typographyVariants = {
  [TypographyType.TITLE]:    'text-title',
  [TypographyType.BODY]:     'text-body',
  [TypographyType.LABEL]:    'text-label',
  [TypographyType.FOOTNOTE]: 'text-footnote',
};

const typographyWeights = {
  [TypographyType.TITLE]:    'font-title',
  [TypographyType.BODY]:     'font-body',
  [TypographyType.LABEL]:    'font-label',
  [TypographyType.FOOTNOTE]: 'font-footnote',
};

const typographyHeights: Record<TypographyType, number> = {
  [TypographyType.TITLE]:    24,
  [TypographyType.BODY]:     16,
  [TypographyType.LABEL]:    14,
  [TypographyType.FOOTNOTE]: 12,
};

export function TypographyBuilder(props: TypographyBuilderProps) {
  const {
    children,
    type,
    className,
    width,
    ...rest
  } = props;

  if (width && (children === undefined || children === null)) {
    return (
      <Skeleton
        width={width}
        height={typographyHeights[type]}
        className={clsx(typographyVariants[type], typographyWeights[type], className, 'rounded-[12px]')}
      />
    );
  }

  return (
    <div
      className={clsx(typographyVariants[type], typographyWeights[type], 'tracking-[-0.04em] leading-[140%] font-pretendard text-grayscale-100', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
