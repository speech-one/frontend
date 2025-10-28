import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function UsagePage() {
  return (
    <VStack fullWidth fullHeight padding={24} spacing={24} className='overflow-y-auto'>
      <VStack fullWidth spacing={12} align='start'>
        <Typography.Title>사용량</Typography.Title>
        <Typography.Body className='text-grayscale-400'>
          API 사용량 및 토큰 소비 현황을 확인합니다.
        </Typography.Body>
      </VStack>

      <VStack fullWidth spacing={16} className='bg-grayscale-900 p-6 rounded-[12px]'>
        <HStack fullWidth justify='between'>
          <Typography.Label className='text-grayscale-300'>이번 달 사용량</Typography.Label>
          <Typography.Body className='text-grayscale-100'>1,234 / 10,000 토큰</Typography.Body>
        </HStack>
        <div className='w-full h-2 bg-grayscale-800 rounded-full overflow-hidden'>
          <div className='h-full bg-blue-500' style={{ width: '12.34%' }} />
        </div>
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>사용 내역</Typography.Label>
        <VStack fullWidth spacing={8}>
          {[
            {
              date: '2025-01-15', tokens: 234, cost: '$0.12',
            },
            {
              date: '2025-01-14', tokens: 189, cost: '$0.09',
            },
            {
              date: '2025-01-13', tokens: 456, cost: '$0.23',
            },
          ].map((item, idx) => (
            <HStack key={idx} fullWidth justify='between' className='p-3 bg-grayscale-800 rounded-[8px]'>
              <Typography.Caption className='text-grayscale-300'>{item.date}</Typography.Caption>
              <HStack spacing={16}>
                <Typography.Caption className='text-grayscale-400'>{item.tokens} 토큰</Typography.Caption>
                <Typography.Caption className='text-grayscale-300'>{item.cost}</Typography.Caption>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}

