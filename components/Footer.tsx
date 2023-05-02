import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='flex lg:ml-20 lg:h-[197px] pt-4 lg:flex-row flex-col h-auto  '>
        <div className='flex flex-col lg:mr-20 lg:items-start items-center mb-5 lg:mb-0'>
          <div className='flex flex-col mb-6'>
            <Image src='/mobile_logo.svg' height={34} width={84} alt='Logo' />
          </div>
          <span className='text-accent1 text-a-xl'>+8 800 555 35 55</span>
          <span className='text-secondary font-bodyLight font-thin'>
            Ответим на любой вопрос
          </span>
        </div>
        <div className='flex flex-col mb-14 lg:mb-0'>
          <div className='flex lg:space-x-20 font-bodyLight text-accent1 lg:font-thin lg:leading-3 lg:flex-row flex-col lg:text-left text-center space-y-6 lg:space-y-0'>
            <span>Проекты</span>
            <span>Специалисты</span>
            <span>Мероприятия</span>
            <span>Исследования</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
