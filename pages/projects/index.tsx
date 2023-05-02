import { useQuery } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import ButtonPrimary from 'components/ButtonPrimary';
import CreateProjectModal from 'components/CreateProjectModal';
import InputMaterial from 'components/InputMaterial';
import ProjectCard from 'components/ProjectCard';
import SelectMaterial from 'components/SelectMaterial';
import SortingSelect from 'components/SortingSelect';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useToggle } from 'usehooks-ts';

const ProjectsPage = () => {
  const [modalVisible, toggleModal] = useToggle();
  const { data } = useQuery({ queryKey: ['projects'], queryFn: getProjects });
  console.info(data, "PROJECTS")

  return (
    <>
      <Head>
        <title>Проекты</title>
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
          <h1 className='lg:mb-4 mb-3 text-h-xl-m font-bold'>Проекты</h1>
          <span className='font-bodyLight text-m mb-8 leading-6'>
            Проекты HENAR - это возможность для диаспоральных врачей Армении
            найти финансирование или помощь
          </span>
          <ButtonPrimary onClick={toggleModal} className='lg:w-[205px]' kind='M'>
            Создать проект
          </ButtonPrimary>
        </div>
        <div className='lg:flex flex-1 hidden'>
          <Image src='/projects-clock.svg' width={466} height={245} alt='' />
        </div>
      </div>

      <h1 className='mb-4 text-h-m-d font-bold'>120 проектов</h1>

      <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
        <span className='min-w-full lg:min-w-[368px]'>
          <InputMaterial icon='search' placeholder='Найти проект' />
        </span>
        <SelectMaterial
          options={[
            { label: 'Россия', val: 'rus' },
            { label: 'Америка', val: 'us' },
          ]}
          icon='globe'
          defaultVal='Все страны'
          label='Страна'
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
            { label: 'По популярности', val: 'rus' },
            { label: 'По откликам', val: 'rus' },
            { label: 'По сферам', val: 'us' },
          ]}
        />
      </div>
      <div className='columns-1 lg:columns-3 space-y-4'>
        <ProjectCard image='proj_bg.png' />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard image='proj_bg.png' />
        <ProjectCard />
      </div>
    </>
  );
};

export default ProjectsPage;
