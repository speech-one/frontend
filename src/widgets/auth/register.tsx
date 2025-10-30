import { RegisterForm } from '@/features/auth/register';
import { Card } from '@/shared/components/layout';

export function RegisterWidget() {
  return (
    <Card width={600} title='회원가입'>
      <RegisterForm />
    </Card>
  );
}
