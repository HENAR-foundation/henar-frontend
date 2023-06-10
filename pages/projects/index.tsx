import { useQuery } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import ButtonPrimary from 'components/ButtonPrimary';
import CreateProjectModal from 'components/CreateProjectModal';
import InputMaterial from 'components/InputMaterial';
import ProjectCard from 'components/ProjectCard';
import SelectMaterial from 'components/SelectMaterial';
import SortingSelect from 'components/SortingSelect';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { useToggle } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { checkSignIn } from 'api/user';

const ProjectsPage = () => {
  const { push } = useRouter();
  const [modalVisible, toggleModal] = useToggle();
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const [filters, setFilters] = useState<{
    country?: string;
    kind?: string;
    search: string;
    sortType: 'popularity' | 'views' | 'field';
  }>({
    country: undefined,
    kind: undefined,
    search: '',
    sortType: 'popularity',
  });

  const t = useTranslations();

  const filteredProjects = projects?.filter(({ title, description }) => {
    return (
      title.en.toLowerCase().includes(filters.search.toLowerCase()) ||
      description.en.toLowerCase().includes(filters.search.toLowerCase())
    );
  });

  const handleCreateProjectClick = () => {
    if (user) toggleModal();
    else push('/registration');
  };

  return (
    <>
      <Head>
        <title> {t('projects')}</title>
      </Head>
      {modalVisible && <CreateProjectModal onClose={toggleModal} />}
      <div className='flex flex-col lg:flex-row bg-white rounded-xl mt-16 mb-16'>
        <div className='lg:hidden flex-1 flex justify-end'>
          <Image
            src='/projects-clock-mobile.svg'
            width={276}
            height={277}
            alt=''
          />
        </div>
        <div className='lg:my-8 lg:mb-8 mb-7 mx-4 lg:mx-10 flex flex-col flex-1'>
          <h1 className='lg:mb-4 mb-3 text-h-xl-m font-bold'>
            {t('projects')}
          </h1>
          <span className='font-bodyLight text-m mb-8 leading-6'>
            Проекты HENAR - это возможность для диаспоральных врачей Армении
            найти финансирование или помощь
          </span>
          <ButtonPrimary
            onClick={handleCreateProjectClick}
            className='lg:w-[205px]'
            kind='M'
          >
            {t('create_project')}
          </ButtonPrimary>
        </div>
        <div className='lg:flex flex-1 hidden'>
          <Image src='/projects-clock.svg' width={466} height={245} alt='' />
        </div>
      </div>

      <h1 className='mb-4 text-h-m-d font-bold'>
        {t('projects_plural', { count: projects?.length || 0 })}
      </h1>
      {projects && projects?.length === 0 && (
        <span className='text-secondary text-m'>
          {t('no_projects_published')}
        </span>
      )}
      {projects && projects?.length !== 0 && (
        <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
          <span className='min-w-full lg:min-w-[368px]'>
            <InputMaterial
              onChange={(newVal) =>
                setFilters((prev) => ({ ...prev, sortType: newVal as any }))
              }
              icon='search'
              placeholder={t('find_project')}
            />
          </span>
          <SelectMaterial
            options={[
              { label: 'Россия', val: 'rus' },
              { label: 'Америка', val: 'us' },
            ]}
            icon='globe'
            defaultVal='Все страны'
            label={t('country')}
          />
          <SelectMaterial
            options={[
              { label: 'Врач', val: 'rus' },
              { label: 'Стоматолог', val: 'us' },
            ]}
            icon='microscope'
            defaultVal='Все направления'
            label='Направление'
          />
          <SortingSelect
            options={[
              { label: t('by_popularity'), val: 'popularity' },
              { label: t('by_response'), val: 'views' },
              { label: t('by_industry'), val: 'field' },
            ]}
          />
        </div>
      )}
      <div className='columns-1 lg:columns-3 space-y-4 mb-10'>
        {filteredProjects?.map((project) => (
          <ProjectCard data={project} image='proj_bg.png' />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...(await import(`../../messages/${locale}.json`)).default,
        ...(await import(`../../messages/formErrors/${locale}.json`)).default,
      },
    },
  };
};

export default ProjectsPage;
