import { Typography } from '@/shared/components/foundation';
import { VStack } from '@/shared/components/layout';

export default function AccountEditPage() {
  return (
    <VStack fullWidth fullHeight padding={24} spacing={24} className='overflow-y-auto'>
      <VStack fullWidth spacing={12} align='start'>
        <Typography.Title>계정 수정</Typography.Title>
        <Typography.Body className='text-grayscale-400'>
          프로필 정보를 수정합니다.
        </Typography.Body>
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>이름</Typography.Label>
        <input
          type='text'
          className='w-full bg-grayscale-800 text-grayscale-200 px-4 py-3 rounded-[8px] border border-grayscale-700 focus:outline-none focus:ring-2 focus:ring-grayscale-600'
          placeholder='이름을 입력하세요'
          defaultValue='Jeewon Kwon'
        />
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>이메일</Typography.Label>
        <input
          type='email'
          className='w-full bg-grayscale-800 text-grayscale-200 px-4 py-3 rounded-[8px] border border-grayscale-700 focus:outline-none focus:ring-2 focus:ring-grayscale-600'
          placeholder='이메일을 입력하세요'
          defaultValue='user@example.com'
        />
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>전화번호</Typography.Label>
        <input
          type='tel'
          className='w-full bg-grayscale-800 text-grayscale-200 px-4 py-3 rounded-[8px] border border-grayscale-700 focus:outline-none focus:ring-2 focus:ring-grayscale-600'
          placeholder='전화번호를 입력하세요'
        />
      </VStack>

      <button className='px-6 py-3 bg-blue-500 text-white rounded-[8px] hover:bg-blue-600 transition-colors'>
        저장
      </button>
    </VStack>
  );
}

