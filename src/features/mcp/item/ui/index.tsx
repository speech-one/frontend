import { overlay } from 'overlay-kit';
import { useDeleteMcp } from '@/entities/mcp';
import { ConfirmModal, IconButton } from '@/shared/components/content';
import { Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';
import { useSettingsRouter } from '@/widgets/settings/hash-router';

interface McpItemProps {
  id:    string;
  title: string;
}

export function McpItem(props: McpItemProps) {
  const { id, title } = props;
  const deleteMcp = useDeleteMcp();
  const { changeTab } = useSettingsRouter();

  const handleDelete = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <ConfirmModal title='MCP 삭제' description='다음 MCP를 삭제하시겠습니까?' isOpen={isOpen} onClose={close} onConfirm={async () => {
          await deleteMcp.mutateAsync(id);
        }} />
      );
    });
  };

  return (
    <HStack fullWidth justify='between' padding={[12, 16]} className='bg-grayscale-700 rounded-[10px]' spacing={8} align='center'>
      <Typography.Label className='truncate block'>{title}</Typography.Label>

      <HStack spacing={8}>
        <IconButton icon='pencil' size='small' background onClick={() => {
          changeTab('mcp', 'edit', { id });
        }} />
        <IconButton icon='trash' theme='destructive' size='small' background onClick={handleDelete} />
      </HStack>
    </HStack>
  );
}
