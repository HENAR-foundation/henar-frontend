import EventCard from 'components/EventCard';
import Head from 'next/head';
import { getEvents } from 'api/events';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import { checkSignIn } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';
import { useToggle } from 'usehooks-ts';
import CreateEventModal from 'components/CreateEventModal';

const EventsPage = () => {
    const [modalVisible, toggleModal] = useToggle();

    const { data: events } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    const { data: user } = useQuery({
        queryKey: ['isSignedIn'],
        queryFn: checkSignIn,
    });

    const t = useTranslations();

    const handleCreateProjectClick = () => {
        if (user?.role === 'admin') toggleModal();
    };

    return (
        <>
            <Head>
                <title>{t('events')}</title>
            </Head>
            {modalVisible && <CreateEventModal onClose={toggleModal} />}

            <div className='flex mt-[59px]'>
                <div>
                    <h1 className='mb-2 text-h-xl-m  font-bold'>{t('events')}</h1>
                    <span className='mb-4 font-bodyLight text-l'>
                        {t('all_events_related')}
                    </span>
                </div>
            </div>
            {user?.role === 'admin' && <ButtonPrimary
                onClick={handleCreateProjectClick}
                className='lg:w-[205px]'
                kind='M'
            >
                {t('create_event')}
            </ButtonPrimary>}
            <section>
                <div className='mt-6 space-x-0  w-full mb-9 lg:gap-x-9 columns-1 lg:columns-3 space-y-[28px]'>
                    {events?.map((event) => (
                        <EventCard event={event} key={event._id} />
                    ))}
                </div>
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    //   const queryClient = new QueryClient();

    //   await queryClient.fetchQuery({ queryFn: getTags, queryKey: ['tags'] });

    //   await queryClient.fetchQuery({
    //     queryKey: ['events'],
    //     queryFn: getEvents,
    //   });

    return {
        props: {
            messages: {
                ...(await import(`../../messages/${locale}.json`)).default,
                ...(await import(`../../messages/formErrors/${locale}.json`)).default,
            },
            //   dehydratedState: dehydrate(queryClient),
        },
    };
};

export default EventsPage;
