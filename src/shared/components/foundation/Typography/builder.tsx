import clsx from 'clsx';
import { TypographyType } from './shared';

interface TypographyBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type:     TypographyType;
}

const typographyVariants = {
  [TypographyType.TITLE]:   'text-title',
  [TypographyType.BODY]:    'text-body',
  [TypographyType.LABEL]:   'text-label',
  [TypographyType.CAPTION]: 'text-caption',
};

const typographyWeights = {
  [TypographyType.TITLE]:   'font-title',
  [TypographyType.BODY]:    'font-body',
  [TypographyType.LABEL]:   'font-label',
  [TypographyType.CAPTION]: 'font-caption',
};

export function TypographyBuilder(props: TypographyBuilderProps) {
  const {
    children,
    type,
    className,
    ...rest
  } = props;

  return (
    <div
      className={clsx(typographyVariants[type], typographyWeights[type], 'tracking-[-0.04em] leading-[140%] font-pretendard text-grayscale-100', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
