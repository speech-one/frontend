import { Button, IconButton, Textarea } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack, VStack } from '@/shared/components/layout';

export default function SystemPromptPage() {
  return (
    <VStack fullWidth fullHeight className='overflow-y-auto' spacing={24} justify='start'>
      <VStack fullWidth spacing={12} align='end'>
        <Textarea fullWidth placeholder='시스템 프롬프트를 입력해주세요.' height={200}/>

        <Button leadingIcon='plus' size='md'>등록하기</Button>
      </VStack>

      <VStack fullWidth spacing={12} align='start'>
        <Typography.Title>등록한 프롬프트 목록</Typography.Title>

        <VStack fullWidth spacing={8}>
          <HStack fullWidth justify='between' padding={[12, 16]} className='bg-grayscale-700 rounded-[10px]'>
            <Typography.Label className='w-[70%] min-w-0 truncate'>언어는 한국어로 진행해줘, 그리고 나는 기획자야. 기획자의 눈 높이에 맞게 설명해주고 B2B 서비스에 맞게끔 조사해주고 PPT를 제작해줘.</Typography.Label>

            <IconButton icon='trash' theme='destructive' size='small' background />
          </HStack>

          <HStack fullWidth justify='between' padding={[12, 16]} className='bg-grayscale-700 rounded-[10px]'>
            <Typography.Label className='w-[70%] min-w-0 truncate'>언어는 한국어로 진행해줘, 그리고 나는 기획자야. 기획자의 눈 높이에 맞게 설명해주고 B2B 서비스에 맞게끔 조사해주고 PPT를 제작해줘.</Typography.Label>

            <IconButton icon='trash' theme='destructive' size='small' background />
          </HStack>

          <HStack fullWidth justify='between' padding={[12, 16]} className='bg-grayscale-700 rounded-[10px]'>
            <Typography.Label className='w-[70%] min-w-0 truncate'>언어는 한국어로 진행해줘, 그리고 나는 기획자야. 기획자의 눈 높이에 맞게 설명해주고 B2B 서비스에 맞게끔 조사해주고 PPT를 제작해줘.</Typography.Label>

            <IconButton icon='trash' theme='destructive' size='small' background />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

