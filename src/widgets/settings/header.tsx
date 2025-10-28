import { Typography } from '@/shared/components/foundation';
import { HStack } from '@/shared/components/layout';

export function SettingsHeader() {
  return (
    <HStack fullWidth padding={[16, 20]} justify='start'>
      <Typography.Body>Speech-One</Typography.Body>
    </HStack>
  );
}
