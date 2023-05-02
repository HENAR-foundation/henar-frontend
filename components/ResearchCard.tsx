import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Tag from './Tag';

const ResearchCard = () => {
//   const { push } = useRouter();
//   const handleClick = () => {
//     push('/projects/1');
//   };

  return (
    <div
      className='flex flex-col bg-white rounded-l overflow-hidden'
    >
      <div className='flex p-5 flex-col'>
        <div className='flex justify-between w-full mb-2 text-a-ss text-accent1 font-bodyLight'>
          <span>Институт Здравоохранения Москвы</span>
        </div>
        <span className='mb-3 text-a-m font-medium'>
          Исследование использования атомарных сред для прогнозирования развития
          гидроторакса
        </span>
        <div className='inline-flex flex-wrap gap-2 mb-6'>
          <Tag name='Медицина' />
          <Tag name='Медицина' />
        </div>
        <div className='space-x-1 flex'>
          <Image src='/external-link-alt.svg' width={16} height={16} alt='' />
          <Link href='https://www.ya.ru' target='_blank' className='font-bodyLight text-a-ss'>
            Сайт minzdravresearch.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
