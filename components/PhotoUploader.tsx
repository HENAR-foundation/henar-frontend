import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const PhotoUploader = () => {
  const t = useTranslations();
  return (
    <div className='flex w-[150px] h-[150px] items-center justify-center bg-peach rounded-xl flex-col text-accent2 cursor-pointer'>
      <Image
        src='/camera-peach.svg'
        width={20}
        height={20}
        alt={t('upload_photo')}
      />
      <span className='cursor-default text-a-ss'>{t('upload_photo')}</span>
    </div>
  );
};

export default PhotoUploader;
