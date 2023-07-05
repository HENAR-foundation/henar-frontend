import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from 'api/events';
import FishImage from 'components/FishImage';
import Tag from 'components/Tag';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const EventPage = () => {
  const router = useRouter()
  const t = useTranslations();
  const { slug } = router.query;
  

  const { data: event } = useQuery({
    queryFn: () => getEvent(slug as any),
    queryKey: ["event", slug]
  });

  console.log(event)

  return (
    <>
      <Head>
        <title>{t("event")}</title>
      </Head>
      <div>
        <div className='absolute w-full top-14 left-0 lg:hidden flex aspect-[1.45/1] mb-5'>
        {event?.cover ? (
            <Image
              fill
              src={event.cover}
              alt='project cover'
              className='object-cover'
            />
          ) : (
            <FishImage />
          )}
        </div>
        <div className='relative z-10 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 mt-[178px] lg:mt-[90px]'>
          <div className=' order-2 lg:order-1 lg:col-span-2 space-y-5'>
            <div className='hidden lg:flex aspect-[1.8/1] relative mb-5'>
            {event?.cover ? (
            <Image
              fill
              src={event.cover}
              alt='project cover'
              className='object-cover'
            />
          ) : (
            <FishImage />
          )}
            </div>
            <div className='bg-white rounded-s px-5 pt-5 pb-9 lg:pb-5 lg:min-h-[240px]'>
              <h3 className='text-a-l mb-3'>{t('about_the_event')}</h3>
              <span className='font-bodyLight'>
                {event?.description?.en}
              </span>
            </div>
            <div className='bg-white rounded-s px-5 pt-5 pb-9 lg:pb-5'>
              <h3 className='text-a-l mb-3'>{t('org')}</h3>
              <span className='font-bodyLight'>
                {event?.orgs}
              </span>
            </div>
          </div>
          <div className='lg:order-2 col-span-1 space-y-5'>
            <div className='bg-white rounded-s pt-5 pb-[45px] px-5 overflow-hidden'>
              <h2 className='text-h-s-d text-xl leading-6 mb-4'>
                {event?.title.en}
              </h2>
              <p className='flex flex-col mb-4'>
                <span className='text-secondary text-a-ss mb-2'>
                  {t('date')}
                </span>
                <span className='text-l text-primary'>{new Date(event?.date as any).toLocaleDateString()}</span>
              </p>
              {/* <p className='flex flex-col mb-2'>
                <span className='text-secondary text-a-ss mb-1'>
                  {t('where')}
                </span>
                <span className='text-m text-primary font-bodyLight'>
                  ...
                </span>
              </p> */}
            </div>
            <div className='bg-white rounded-s pt-5 pb-9 lg:pb-[68px] px-5 overflow-hidden'>
              <h3 className='text-a-l mb-3'>{t('links')}</h3>
              <Link target="_blank" className='text-m text-primary font-bodyLight' href={event?.links  || "test"}>
                {event?.links || "test"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  // const queryClient = new QueryClient();

  // await queryClient.fetchQuery({
  //   queryKey: ['projects'],
  //   queryFn: getProjects,
  // });

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EventPage;
