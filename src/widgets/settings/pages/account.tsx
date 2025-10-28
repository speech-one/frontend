'use client';

import { Avatar } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '../hash-router';

export default function AccountPage() {
  const { changeTab } = useSettingsRouter();

  return (
    <VStack fullWidth fullHeight padding={24} spacing={24} className='overflow-y-auto'>
      <HStack fullWidth justify='between' align='start'>
        <VStack spacing={12} align='start'>
          <Typography.Title>계정</Typography.Title>
          <Typography.Body className='text-grayscale-400'>
            계정 정보 및 프로필을 관리합니다.
          </Typography.Body>
        </VStack>

        <button
          onClick={() => changeTab('account', 'edit')}
          className='px-4 py-2 bg-blue-500 text-white rounded-[8px] hover:bg-blue-600 transition-colors'
        >
          수정
        </button>
      </HStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>프로필</Typography.Label>
        <VStack fullWidth spacing={12}>
          <Avatar
            src='https://api.dicebear.com/7.x/avataaars/svg?seed=user'
            size={80}
          />
          <VStack spacing={4} align='start'>
            <Typography.Body>사용자 이름</Typography.Body>
            <Typography.Caption className='text-grayscale-400'>
              user@example.com
            </Typography.Caption>
          </VStack>
        </VStack>
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>계정 설정</Typography.Label>
        <VStack fullWidth spacing={12} align='start'>
          <div className='text-grayscale-300 text-sm'>
            이메일 알림
          </div>
          <div className='text-grayscale-300 text-sm'>
            비밀번호 변경
          </div>
        </VStack>
      </VStack>
    </VStack>
  );
}

