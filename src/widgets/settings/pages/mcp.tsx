import { useMcpList } from '@/entities/mcp/api/hooks/use-mcp-list';
import { McpItem } from '@/features/mcp';
import { Button, Skeleton } from '@/shared/components/content';
import { Icon, Typography } from '@/shared/components/foundation';
import { VStack } from '@/shared/components/layout';
import { useSettingsRouter } from '../hash-router';

export default function McpPage() {
  const { mcpList, isPending } = useMcpList();
  const isMcpListEmpty = mcpList?.length === 0;
  const { changeTab } = useSettingsRouter();

  if (isPending) {
    return (
      <VStack fullWidth fullHeight className='overflow-y-auto' spacing={12} justify='start' align='end'>
        {
          Array.from({ length: 3 })
            .map((_, index) => <Skeleton key={index} variant='rounded' className='w-full' height={52} />)
        }

        <Button leadingIcon='plus' size='md' onClick={() => changeTab('mcp', 'add')}>등록하기</Button>
      </VStack>
    );
  }

  if (isMcpListEmpty) {
    return (
      <VStack fullWidth fullHeight justify='center' align='center' spacing={20}>
        <VStack spacing={8} align='center'>
          <Icon name='waypoints' size={36} className='text-grayscale-200' />
          <Typography.Label className='text-grayscale-300'>아래 버튼을 눌러, MCP 서버를 추가하세요!</Typography.Label>
        </VStack>

        <Button leadingIcon='plus' size='md' onClick={() => changeTab('mcp', 'add')}>등록하기</Button>
      </VStack>
    );
  }

  return (
    <VStack fullWidth fullHeight className='overflow-y-auto' spacing={12} justify='start' align='end'>
      {
        mcpList?.map(mcp => <McpItem key={mcp.id} id={mcp.id} title={mcp.title} />)
      }

      <Button leadingIcon='plus' size='md' onClick={() => changeTab('mcp', 'add')}>등록하기</Button>
    </VStack>
  );
}

