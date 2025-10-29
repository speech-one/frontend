import { Typography } from '@/shared/components/foundation';
import { VStack } from '../VStack';

interface CardProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  width?:   number;
  height?:  number;
}

export function Card(props: CardProps) {
  const {
    children,
    title,
    width,
    height,
    ...rest
  } = props;

  return (
    <VStack fullWidth={width === undefined ? true : false} spacing={24} padding={[32, 48]} className='bg-grayscale-800 rounded-[12px] border border-grayscale-600' {...rest} width={width} height={height} justify='center' align='center'>
      <Typography.Title>{title}</Typography.Title>
      {children}
    </VStack>
  );
}
