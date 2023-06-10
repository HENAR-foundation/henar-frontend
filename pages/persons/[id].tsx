import { useQuery } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import { FullName } from 'api/types';
import { getUser } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';
import ProjectCard from 'components/ProjectCard';
import RequestContactInfoModal from 'components/RequestContactInfoModal';
import Tag from 'components/Tag';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useToggle } from 'usehooks-ts';
import { checkSignIn } from 'api/user';
import FishImage from 'components/FishImage';
import { formatFullName } from 'helpers';

const SpecialistPage: FC<{ locale: string }> = ({ locale }) => {
  const router = useRouter();
  const { id } = router.query;
  const [contactModal, toggleModal] = useToggle();

  const { data } = useQuery({ queryFn: getProjects, queryKey: ['projects'] });

  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });

  const { data: expert } = useQuery({
    queryFn: () => getUser(id?.toString() || ''),
    queryKey: ['person', id],
  });

  const isContactAlreadyRequested =
    !!user?.contacts_request?.outgoing_contact_requests[id as any];

  const t = useTranslations();

  const handleRequestInfo = () => {
    if (user) {
      toggleModal();
    } else {
      router.push('/registration');
      PubSub.publish(
        'notification',
        'Please register to request specialist information'
      );
    }
  };

  const { data: unfilteredProjects } = useQuery({
    queryFn: getProjects,
    queryKey: ['projects'],
  });

  const projects = unfilteredProjects?.filter(
    ({ _id }) =>
      !!Object.keys(user?.user_projects?.confirmed_applications || {}).includes(
        _id
      )
  );

  return (
    <>
      <Head>
        <title>{formatFullName(expert) || t('experts')}</title>
      </Head>
      <div>
        <div className='absolute w-full top-14 left-0 lg:hidden flex aspect-[1.45/1] mb-5'>
          <FishImage />
          {/* <Image
            className='max-h-[400px]'
            alt='avatar'
            src='/avatar.jpg'
            style={{ objectFit: 'cover' }}
            fill
          /> */}
        </div>
        {contactModal && <RequestContactInfoModal onClose={toggleModal} />}
        <div className='flex flex-col'>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-[20px] my-[60px] z-20 lg:mt-10 mt-[240px]'>
            <div className='aspect-[1/1] min-h-[325px] relative rounded-xl overflow-hidden lg:inline-block hidden'>
              <FishImage />
              {/* <Image
                alt='avatar'
                src='/avatar.jpg'
                style={{ objectFit: 'cover' }}
                fill
              /> */}
            </div>
            <div className='flex flex-col bg-white rounded-s py-6 px-5 justify-between'>
              <div>
                <h2 className='text-a-xl mb-3'>{formatFullName(expert)}</h2>
                <p className='font-bodyLight text-a-m'>{expert?.description}</p>
              </div>
              <ButtonPrimary
                disabled={isContactAlreadyRequested}
                kind='M'
                icon='arrow'
                className='lg:mt-0 mt-9 text-left text-m'
                onClick={handleRequestInfo}
              >
                {isContactAlreadyRequested
                  ? 'Already requested'
                  : t('request_contacts')}
              </ButtonPrimary>
            </div>
            <div className='flex flex-col bg-white rounded-s py-6 px-5 justify-between'>
              <div>
                <h2 className='text-a-xl mb-5'>{t('information')}</h2>
                <p className='flex justify-between'>
                  <span className='text-tetriary'>{t('country')}</span>
                  <span>Россия</span>
                </p>
                <p className='mt-4 flex justify-between'>
                  <span className='text-tetriary'>{t('specialty')}</span>
                  <span>{expert?.job}</span>
                </p>
                {/* <h3 className='mt-6 text-a-xl mb-4'>{t('interests')}</h3>
                <div className='inline-flex flex-wrap gap-2 lg:mb-8'>
                  <Tag name='Радиология' />
                  <Tag name='Первая помощь' />
                  <Tag name='Радиология' />
                </div> */}
              </div>
            </div>
          </div>
          <h2 className='font-bold text-h-m-d mb-9'>
            {t('responses_plural', {
              count: projects?.length || 0,
            })}
          </h2>
          <div className='w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4 mb-[85px]'>
            {projects?.map((item, index) => (
              <ProjectCard key={index} data={item} />
            ))}
          </div>
          <div className='lg:inline-block hidden'>
            {/* <SpecialistCard
              full_name={{
                en: 'Иванов Пётр Александрович',
                ru: 'TEST',
                hy: 'HY TEST',
              }}
              avatar='avatar.jpg'
              description='Кандидат наук, преподаватель кафедры врачебной медицины в НИУ ВШЭ'
              job='Врач радиолог'
              location='Москва, Россия'
              tags={['Радиология', 'Первая помощь', 'КТ']}
            /> */}
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

export default SpecialistPage;
