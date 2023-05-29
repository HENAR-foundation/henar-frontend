import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useToggle } from 'usehooks-ts';

const locales = [
  {
    code: 'en',
    icon: 'us-flag.png',
    ruName: 'Английский',
    name: 'English',
  },
  {
    code: 'ru',
    icon: 'ru-flag.png',
    ruName: 'Русский',
    name: 'Русский',
  },
  {
    code: 'hy',
    icon: 'hy-flag.png',
    ruName: 'Армянский',
    name: 'Հայերեն',
  },
];

const LangToggle = () => {
  const [opened, toggleOpen] = useToggle(false);
  const [mobileOpened, toggleOpenMobile] = useToggle(false);
  const { locale, push, route, asPath } = useRouter();

  const lcl = useMemo(
    () => locales.find(({ code }) => code === locale),
    [locale]
  );

  const hanldeOpen = () => {
    if (window.innerWidth > 1054) {
      toggleOpen();
    } else {
      toggleOpenMobile();
    }
  };

  const hanldeLocaleChange = (event: any) => {
    if (event.currentTarget.dataset.locale) {
      push(asPath, asPath, { locale: event.currentTarget.dataset.locale });
      hanldeOpen();
    }
  };

  return (
    <>
      {mobileOpened && (
        <div className='lg:hidden fixed top-[55px] w-full h-full z-20 bg-white'>
          <div className='mx-[20px] mt-[12px] flex flex-col'>
            <span className='text-xl mb-[12px]'>Язык</span>
            <span className='text-a-ss text-secondary mb-[17px]'>
              Выберите язык
            </span>

            <hr className='border-t-[1px] border-bgPrimary mb-[20px]' />

            {locales.map(({ code, name, ruName }) => (
              <div
                onClick={hanldeLocaleChange}
                data-locale={code}
                className={`flex flex-col px-[12px] py-[10px] rounded-s${
                  code === locale ? ' bg-bgPrimary' : ''
                }`}
              >
                <span className='text-m font-normal'>{ruName}</span>
                <span className='text-a-ss font-normal text-secondary'>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <section className='mr-3 ml-[25px] w-[115px]'>
        <div className='flex items-center'>
          <div className='mr-4'>
            <Image
              src='/globe-green.svg'
              width={16}
              height={16}
              alt='globe icon'
            />
          </div>
          <div className='flex items-center cursor-pointer relative'>
            <div className='flex items-center' onClick={hanldeOpen}>
              <Image
                src={`/${lcl?.icon}`}
                width={20}
                height={16}
                alt={`/${lcl?.code}-flag`}
              />
              <span className='text-a-ss ml-[10px] mr-2'>{lcl?.name}</span>
              <Image
                className='lg:visible hidden'
                src='/angle-down-grey.svg'
                width={20}
                height={20}
                alt='ru-flag'
              />
            </div>
            {opened && (
              <div className='border-t-[1px] border-[#D3C1AF] bottom-[-99px] bg-white rounded-b-l flex absolute flex-col pl-[10px] py-[11px] min-w-[132px] w-full space-y-[9px]'>
                {locales
                  .filter(({ code }) => code !== locale)
                  .map(({ code, name, icon }) => (
                    <div
                      className='flex'
                      data-locale={code}
                      onClick={hanldeLocaleChange}
                    >
                      <Image
                        src={`/${icon}`}
                        width={20}
                        height={16}
                        alt={`${code}-flag`}
                      />
                      <span className='text-a-ss ml-[10px] mr-2'>{name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LangToggle;
