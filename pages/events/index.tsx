import EventCard from 'components/EventCard';
import InputMaterial from 'components/InputMaterial';
import Head from 'next/head';
import { getEvents } from 'api/events';
import { getTags } from 'api/tags';
import React from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Calendar from 'components/Calendar';
import { checkSignIn } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';

const EventsPage = () => {
  const { data: events } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const { data: user } = useQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });

  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t('events')}</title>
      </Head>
      <div className='flex mt-[59px]'>
        <div>
          <h1 className='mb-2 text-h-xl-m  font-bold'>{t('events')}</h1>
          <span className='mb-4 font-bodyLight text-l'>
            {t('all_events_related')}
          </span>
          {user && <ButtonPrimary kind='M'>Создать мероприятие</ButtonPrimary>}
        </div>
        <Calendar />
      </div>
      <div className='w-[676px] mt-7 mb-10'>
        <InputMaterial icon='search' placeholder={t('find_an_event')} />
      </div>
      <section>
        <h2 className='mb-2 text-h-s-d -m mt-[59px] font-bold'>
          {t('upcoming')}
        </h2>

        <div className='mt-6 space-x-0  w-full mb-9 lg:gap-x-9 columns-1 lg:columns-3 space-y-[28px]'>
          <EventCard image />
          <EventCard />
          <EventCard image />
          <EventCard />
          <EventCard image />
          <EventCard />
          <EventCard image />
        </div>
      </section>
      <section>
        <h2 className='mb-2 text-h-s-d -m mt-9 font-bold'>{t('past')}</h2>

        <div className='mt-6 space-x-0  w-full mb-9 lg:gap-x-9 columns-1 lg:columns-3 space-y-[28px]'>
          {events?.map(() => (
            <EventCard />
          ))}
          <EventCard />
          <EventCard image />
          <EventCard />
          <EventCard />
          <EventCard image />
          <EventCard image />
          <EventCard image />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({ queryFn: getTags, queryKey: ['tags'] });

  await queryClient.fetchQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      //   dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EventsPage;
