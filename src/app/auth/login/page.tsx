'use client';

import { LoginForm } from '@/features/auth';
import { Card } from '@/shared/components/layout';

export default function LoginPage() {
  return (
    <Card width={600} title='로그인'>
      <LoginForm />
    </Card>
  );
}
