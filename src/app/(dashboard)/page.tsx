'use client';

import { useUser } from '@/entities/user';

export default function Home() {
  const { user } = useUser();

  return (
    <div className='bg-grayscale-900'>
      {
        JSON.stringify(user)
      }

    </div>
  );
}
