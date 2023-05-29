import { useQuery } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import ButtonPrimary from 'components/ButtonPrimary';
import ProjectCard from 'components/ProjectCard';
import SpecialistCard from 'components/SpecialistCard';
import Tag from 'components/Tag';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const SpecialistPage = () => {
  const { data } = useQuery({ queryFn: getProjects, queryKey: ['projects'] });
  const t = useTranslations();

  return (
    <>
      <div>
        <div className='absolute w-full top-14 left-0 lg:hidden flex aspect-[1.45/1] mb-5'>
          <Image
            className='max-h-[400px]'
            alt='avatar'
            src='/avatar.jpg'
            style={{ objectFit: 'cover' }}
            fill
          />
        </div>

        <div className='flex flex-col'>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-[20px] my-[60px] z-20 lg:mt-10 mt-[240px]'>
            <div className='aspect-[1/1] min-h-[325px] relative rounded-xl overflow-hidden lg:inline-block hidden'>
              <Image
                alt='avatar'
                src='/avatar.jpg'
                style={{ objectFit: 'cover' }}
                fill
              />
            </div>
            <div className='flex flex-col bg-white rounded-s py-6 px-5 justify-between'>
              <div>
                <h2 className='text-a-xl mb-3'>Иванов Александр Аркадьевич</h2>
                <p className='font-bodyLight text-a-m'>
                  Помогаю врачам находить нужные контакты в медиасреде,
                  консультирую всех бесплатно
                </p>
              </div>
              <ButtonPrimary
                kind='M'
                icon='arrow'
                className='lg:mt-0 mt-9 text-left text-m'
              >
                {t('request_contacts')}
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
                  <span>Радиология</span>
                </p>
                <h3 className='mt-6 text-a-xl mb-4'>{t('interests')}</h3>
                <div className='inline-flex flex-wrap gap-2 lg:mb-8'>
                  <Tag name='Радиология' />
                  <Tag name='Первая помощь' />
                  <Tag name='Радиология' />
                </div>
              </div>
            </div>
          </div>
          <h2 className='font-bold text-h-m-d mb-9'>Учавствует в 3 проектах</h2>
          <div className='w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4 mb-[85px]'>
            {data?.map((item, index) => (
              <ProjectCard key={index} data={item} />
            ))}
          </div>
          <div className='lg:inline-block hidden'>
            <SpecialistCard
              fullName='Иванов Пётр Александрович'
              avatar='avatar.jpg'
              description='Кандидат наук, преподаватель кафедры врачебной медицины в НИУ ВШЭ'
              job='Врач радиолог'
              location='Москва, Россия'
              tags={['Радиология', 'Первая помощь', 'КТ']}
            />
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
