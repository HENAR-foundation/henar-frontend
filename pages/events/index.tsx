import EventCard from 'components/EventCard';
import InputMaterial from 'components/InputMaterial';
import Head from 'next/head';
import { getEvents } from 'api/events';
import { getTags } from 'api/tags';
import React from 'react';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

const EventsPage = () => {
  const { data } = useQuery({ queryKey: ['events'], queryFn: getEvents });

  return (
    <>
      <Head>
        <title>Мероприятия</title>
      </Head>
      <h1 className='mb-2 text-h-xl-m mt-[59px] font-bold'>Мероприятия</h1>
      <span className='mb-4 font-bodyLight text-l'>
        В этом разделе собраны все мероприятия в сфере медицины Армении
      </span>
      <div className='w-[676px] mt-7 mb-10'>
        <InputMaterial icon='search' placeholder='Найти мероприятие' />
      </div>
      <section>
        <h2 className='mb-2 text-h-s-d -m mt-[59px] font-bold'>Предстоящие</h2>

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
        <h2 className='mb-2 text-h-s-d -m mt-9 font-bold'>Прошедшие</h2>

        <div className='mt-6 space-x-0  w-full mb-9 lg:gap-x-9 columns-1 lg:columns-3 space-y-[28px]'>
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

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  // prefetch data on the server
  await queryClient.fetchQuery({ queryFn: getTags, queryKey: ['tags'] });

  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default EventsPage;
