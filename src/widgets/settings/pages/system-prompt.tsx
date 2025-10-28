import { Typography } from '@/shared/components/foundation';
import { VStack } from '@/shared/components/layout';

export default function SystemPromptPage() {
  return (
    <VStack fullWidth fullHeight padding={24} spacing={24} className='overflow-y-auto'>
      <VStack fullWidth spacing={12} align='start'>
        <Typography.Title>시스템 프롬프트</Typography.Title>
        <Typography.Body className='text-grayscale-400'>
          AI의 동작 방식을 커스터마이징할 수 있습니다.
        </Typography.Body>
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>기본 프롬프트</Typography.Label>
        <textarea
          className='w-full h-40 bg-grayscale-800 text-grayscale-200 p-4 rounded-[8px] resize-none focus:outline-none focus:ring-2 focus:ring-grayscale-600'
          placeholder='시스템 프롬프트를 입력하세요...'
          defaultValue='You are a helpful AI assistant.'
        />
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>프롬프트 템플릿</Typography.Label>
        <VStack fullWidth spacing={8} align='start'>
          <div className='w-full p-3 bg-grayscale-800 rounded-[8px] text-grayscale-300 text-sm cursor-pointer hover:bg-grayscale-700'>
            코딩 어시스턴트
          </div>
          <div className='w-full p-3 bg-grayscale-800 rounded-[8px] text-grayscale-300 text-sm cursor-pointer hover:bg-grayscale-700'>
            번역가
          </div>
          <div className='w-full p-3 bg-grayscale-800 rounded-[8px] text-grayscale-300 text-sm cursor-pointer hover:bg-grayscale-700'>
            글쓰기 도우미
          </div>
        </VStack>
      </VStack>
    </VStack>
  );
}

