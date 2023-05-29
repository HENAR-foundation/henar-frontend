import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import Tag from './Tag';
import { Research } from 'api/types';

const ResearchCard: FC<Research> = ({ title, description, link }) => {
  //   const { push } = useRouter();
  //   const handleClick = () => {
  //     push('/projects/1');
  //   };

  return (
    <div className='flex flex-col bg-white rounded-l overflow-hidden'>
      <div className='flex p-5 flex-col'>
        <div className='flex justify-between w-full mb-2 text-a-ss text-accent1 font-bodyLight'>
          <span>{title.en}</span>
        </div>
        <span className='mb-3 text-a-m font-medium'>{description.en}</span>
        <div className='inline-flex flex-wrap gap-2 mb-6'>
          <Tag name='Медицина' />
          <Tag name='Медицина' />
        </div>
        <div className='space-x-1 flex'>
          <Image src='/external-link-alt.svg' width={16} height={16} alt='' />
          <Link
            href={link}
            target='_blank'
            className='font-bodyLight text-a-ss'
          >
            Сайт {link}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
