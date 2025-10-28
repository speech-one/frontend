import { Icon, Typography } from '@/shared/components/foundation';
import { VStack } from '@/shared/components/layout';

export default function MCPPage() {
  return (
    <VStack fullWidth fullHeight padding={24} spacing={24} className='overflow-y-auto'>
      <VStack fullWidth spacing={12} align='start'>
        <Typography.Title>MCP</Typography.Title>
        <Typography.Body className='text-grayscale-400'>
          Model Context Protocol 설정을 관리합니다.
        </Typography.Body>
      </VStack>

      <VStack fullWidth spacing={16} align='start' className='bg-grayscale-900 p-6 rounded-[12px]'>
        <Typography.Label className='text-grayscale-300'>연결된 서버</Typography.Label>
        <VStack fullWidth spacing={8}>
          {[
            {
              name: 'File System', status: 'active', description: '로컬 파일 시스템 접근',
            },
            {
              name: 'Database', status: 'inactive', description: 'PostgreSQL 데이터베이스',
            },
            {
              name: 'API Gateway', status: 'active', description: 'REST API 통합',
            },
          ].map((server, idx) => (
            <div key={idx} className='w-full p-4 bg-grayscale-800 rounded-[8px]'>
              <VStack spacing={8} align='start'>
                <div className='flex items-center gap-3'>
                  <Icon
                    name='server'
                    size={20}
                    className={server.status === 'active' ? 'text-green-500' : 'text-grayscale-500'}
                  />
                  <Typography.Body className='text-grayscale-200'>{server.name}</Typography.Body>
                  <span className={`text-xs px-2 py-1 rounded ${
                    server.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-grayscale-700 text-grayscale-400'
                  }`}>
                    {server.status === 'active' ? '활성' : '비활성'}
                  </span>
                </div>
                <Typography.Footnote className='text-grayscale-400'>{server.description}</Typography.Footnote>
              </VStack>
            </div>
          ))}
        </VStack>
      </VStack>

      <button className='px-4 py-2 bg-blue-500 text-white rounded-[8px] hover:bg-blue-600 transition-colors'>
        새 서버 추가
      </button>
    </VStack>
  );
}

