'use client';

import { Input } from '@/shared/components/content/Input';

export default function Home() {
  return (
    <div className='bg-grayscale-900'>
      <Input
        label='Email'
        placeholder='Enter your email'
        helperText='Enter your email'
        startIcon='mail'
        endIcon='eye'
        onEndIconClick={() => {
          console.log('eye');
        }}
      />
    </div>
  );
}
