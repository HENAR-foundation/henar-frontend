import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className='bg-white'>
      <div className='flex lg:ml-20 lg:mr-20 lg:h-[197px] pt-4 lg:flex-row flex-col h-auto  '>
        <div className='flex flex-col lg:mr-20 lg:items-start items-center mb-5 lg:mb-0'>
          <div className='flex flex-col mb-6'>
            <Image src='/logo-footer.svg' height={34} width={118} alt='Logo' />
          </div>
          <Link href="mailto:info@henar.am"><span className='text-accent1 text-a-xl'>info@henar.am</span></Link>
          <span className='text-secondary font-bodyLight font-thin'>
            Powored by HENAR
          </span>
        </div>
        <div className='flex flex-col mb-14 lg:mb-0 w-full'>
          <div className='flex lg:space-x-20 w-full h-full font-bodyLight text-accent1 lg:font-thin lg:leading-3 flex-col lg:text-left text-center space-y-6 lg:space-y-0 items-end justify-end mb-10 '>
            <Link  className='mb-5' target='_blank' href="/HENAR_Terms-and-Conditions_eng.pdf">
                <span>{t('terms_and_conditions')}</span>
            </Link>
            <Link target='_blank' href="/HENAR_Privacy-Policy_eng.pdf">
                <span>{t('privacy_policy')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
