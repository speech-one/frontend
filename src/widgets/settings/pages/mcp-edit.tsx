import { EditMcpForm } from '@/features/mcp';
import { useSettingsRouter } from '../hash-router';

export default function EditMcpPage() {
  const { params } = useSettingsRouter();

  return (
    <EditMcpForm id={params.id || ''}/>
  );
}

