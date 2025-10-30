import { LoginForm } from '@/features/auth';
import { Card } from '@/shared/components/layout';

export function LoginWidget() {
  return (
    <Card width={600} title='로그인'>
      <LoginForm />
    </Card>
  );
}
