'use client';

import { useMe } from '@/entities/user';

export default function Home() {
  const { user } = useMe();

  return (
    <div className='bg-grayscale-900'>
      {
        JSON.stringify(user)
      }

    </div>
  );
}
