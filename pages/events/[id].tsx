import FishImage from 'components/FishImage';
import Tag from 'components/Tag';
import Head from 'next/head';
import React from 'react';

const EventPage = () => {
  return (
    <>
      <Head>
        <title>Событие</title>
      </Head>
      <div>
        <div className='absolute w-full top-14 left-0 lg:hidden flex aspect-[1.45/1] mb-5'>
          <FishImage />
        </div>
        <div className='relative z-10 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 mt-[178px] lg:mt-[90px]'>
          <div className=' order-2 lg:order-1 lg:col-span-2 space-y-5'>
            <div className='hidden lg:flex aspect-[1.8/1] relative mb-5'>
              <FishImage />
            </div>
            <div className='bg-white rounded-s px-5 pt-5 pb-9 lg:pb-5 lg:min-h-[240px]'>
              <h3 className='text-a-l mb-3'>О мероприятии</h3>
              <span className='font-bodyLight'>
                Армения, проспект Адмирала Жукова, 23, вход со стороны подъезда,
                Армения, проспект Адмирала Жукова, 23, вход со стороны
                подъездаАрмения, проспект Адмирала Жукова, 23, вход со стороны
                подъезда
              </span>
            </div>
          </div>
          <div className='lg:order-2 col-span-1 space-y-5'>
            <div className='bg-white rounded-s pt-5 pb-[45px] px-5 overflow-hidden'>
              <h2 className='text-h-s-d text-xl leading-6 mb-4'>
                Разработка новой системы анализа медицинских снимков
              </h2>
              <p className='flex flex-col mb-4'>
                <span className='text-secondary text-a-ss mb-2'>Дата</span>
                <span className='text-l text-primary'>14 декабря, 18:00</span>
              </p>
              <p className='flex flex-col mb-2'>
                <span className='text-secondary text-a-ss mb-1'>Место</span>
                <span className='text-m text-primary font-bodyLight'>
                  Армения, проспект Адмирала Жукова, 23, вход со стороны
                  подъезда
                </span>
              </p>
              <span className='text-secondary text-a-ss'>Темы</span>
              <div className='inline-flex flex-wrap gap-x-6 gap-y-2 mt-3'>
                <Tag color='grey' name='Радиология' />
                <Tag color='grey' name='Первая помощь' />
                <Tag color='grey' name='Радиология' />
              </div>
            </div>
            <div className='bg-white rounded-s pt-5 pb-9 lg:pb-[68px] px-5 overflow-hidden lg:min-h-[240px]'>
              <h3 className='text-a-l mb-3'>Как попасть</h3>
              <p className='text-m text-primary font-bodyLight'>
                Для посещения мероприятия не нужно записываться, просто
                приходите в нужное время по адерсу
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
