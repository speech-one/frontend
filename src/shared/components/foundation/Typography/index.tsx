import { TypographyBuilder } from './builder';
import { TypographyType } from './shared';

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?:   number;
}

const Title = (props: TypographyProps) => <TypographyBuilder type={TypographyType.TITLE} width={props.width} {...props} />;
const Body = (props: TypographyProps) => <TypographyBuilder type={TypographyType.BODY} width={props.width} {...props} />;
const Label = (props: TypographyProps) => <TypographyBuilder type={TypographyType.LABEL} width={props.width} {...props} />;
const Footnote = (props: TypographyProps) => <TypographyBuilder type={TypographyType.FOOTNOTE} width={props.width} {...props} />;

export const Typography = {
  Title,
  Body,
  Label,
  Footnote,
};
