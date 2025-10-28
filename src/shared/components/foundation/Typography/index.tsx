import { TypographyBuilder } from './builder';
import { TypographyType } from './shared';

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Title = (props: TypographyProps) => <TypographyBuilder type={TypographyType.TITLE} {...props} />;
const Body = (props: TypographyProps) => <TypographyBuilder type={TypographyType.BODY} {...props} />;
const Label = (props: TypographyProps) => <TypographyBuilder type={TypographyType.LABEL} {...props} />;
const Footnote = (props: TypographyProps) => <TypographyBuilder type={TypographyType.FOOTNOTE} {...props} />;

export const Typography = {
  Title,
  Body,
  Label,
  Footnote,
};
