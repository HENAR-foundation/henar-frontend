import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
//   const t = useTranslations();
  return (
    <footer className='bg-white'>
      <div className='flex lg:ml-20 lg:h-[197px] pt-4 lg:flex-row flex-col h-auto  '>
        <div className='flex flex-col lg:mr-20 lg:items-start items-center mb-5 lg:mb-0'>
          <div className='flex flex-col mb-6'>
            <Image src='/logo-footer.svg' height={34} width={118} alt='Logo' />
          </div>
          <span className='text-accent1 text-a-xl'>+8 800 555 35 55</span>
          <span className='text-secondary font-bodyLight font-thin'>
            Ответим на любой вопрос
          </span>
        </div>
        <div className='flex flex-col mb-14 lg:mb-0'>
          <div className='flex lg:space-x-20 font-bodyLight text-accent1 lg:font-thin lg:leading-3 lg:flex-row flex-col lg:text-left text-center space-y-6 lg:space-y-0'>
            {/* <span>{t('projects')}</span>
            <span>{t('experts')}</span>
            <span>{t('events')}</span>
            <span>{t('analytics')}</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
