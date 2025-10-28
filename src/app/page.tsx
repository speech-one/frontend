'use client';

import { IconButton } from '@/shared/components/content';
import { Icon } from '@/shared/components/foundation';

export default function Home() {
  return (
    <div className='bg-grayscale-900'>
      <Icon name={'youtube'} />
      <IconButton icon={'youtube'} onClick={() => {
        console.log('Edit');
      }} theme='monochrome'/>
      <IconButton icon={'youtube'} onClick={() => {
        console.log('Edit');
      }} theme='destructive' />
      <IconButton icon={'youtube'} onClick={() => {
        console.log('Edit');
      }} theme='warning' />
    </div>
  );
}
