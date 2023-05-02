import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import InputMaterial from './InputMaterial';
import ProjectCard from './ProjectCard';
import TextAreaMaterial from './TextAreaMaterial';

enum tabTypes {
  Profile = 'Профиль',
  Projects = 'Проекты',
  Password = 'Изменить пароль',
}
type IS = keyof typeof tabTypes;

const PhotoUploader = () => (
  <div className='flex w-[150px] h-[150px] items-center justify-center bg-peach rounded-xl flex-col text-accent2 cursor-pointer'>
    <Image src='/camera-peach.svg' width={20} height={20} alt='upload photo' />
    <span className='cursor-default text-a-ss'>Загрузить фото</span>
  </div>
);

const AboutTab = () => (
  <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Фотография</span>
      <div className='flex flex-1 w-full flex-col'>
        <PhotoUploader />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Как вас зовут?</span>
      <div className='flex flex-1 space-y-3 w-full flex-col'>
        <InputMaterial label='Имя' />
        <InputMaterial label='Фамилия' />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Откуда вы?</span>
      <div className='flex flex-1 flex-col w-full'>
        <InputMaterial label='Введите город' />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Кем вы работаете?</span>
      <div className='flex flex-1 flex-col w-full'>
        <InputMaterial label='Введите должность' />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>О себе?</span>
      <div className='flex flex-1 flex-col w-full'>
        <TextAreaMaterial label='О себе' />
      </div>
    </div>
  </div>
);

const PasswordTab = () => (
  <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Старый пароль</span>
      <div className='flex flex-1 space-y-3 w-full flex-col'>
        <InputMaterial label='Пароль' type='password' />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Новый пароль</span>
      <div className='flex flex-1 space-y-3 w-full flex-col'>
        <InputMaterial label='Пароль' type='password' />
        <InputMaterial label='Повторите пароль' type='password' />
      </div>
    </div>
  </div>
);

const ProjectsTab = () => <ProjectCard withShadow />;

const tabsContentByType: { [key in tabTypes]?: JSX.Element } = {
  [tabTypes.Profile]: AboutTab(),
  [tabTypes.Password]: PasswordTab(),
  [tabTypes.Projects]: ProjectsTab(),
};

const ProfileModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const [activeTab, toggleTab] = useState<tabTypes>(tabTypes.Profile);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const handleClose = (e: any) => {
    if (e.target.dataset.overlay) {
      onClose();
    }
  };

  return (
    <div
      data-overlay='true'
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={handleClose}
      className='fixed w-full h-full z-[100] left-0 top-0'
    >
      <div
        data-overlay='true'
        className='flex w-full h-full items-center justify-center opacity-1 overflow-auto'
      >
        <Image
          src='/cross-white.svg'
          width={20}
          height={20}
          alt='close button'
          className='absolute right-5 top-5 lg:hidden flex'
          onClick={onClose}
        />
        <div className='flex bg-white rounded-xxl lg:p-[26px] w-full max-w-[1100px] min-h-[700px] lg:flex-row flex-col h-screen lg:h-auto overflow-auto lg:mt-0 mt-[115px]'>
          <div className='bg-peach rounded-xl'>
            <div className='flex flex-col lg:w-[307px] mx-7 my-10 '>
              <h3 className='mb-8 text-h-m-d font-bold'>Настройки</h3>
              {(Object.keys(tabTypes) as Array<IS>).map((tab) => (
                <span
                  onClick={() => toggleTab(tabTypes[tab])}
                  className={`cursor-pointer p-4 w-full ${
                    activeTab === tabTypes[tab] ? 'bg-white' : ''
                  } rounded-l`}
                >
                  {tabTypes[tab]}
                </span>
              ))}
            </div>
          </div>
          <div className='flex flex-col lg:ml-14 flex-1'>
            <div className='lg:flex hidden justify-end'>
              <Image
                src='/cross-grey.svg'
                width={20}
                height={20}
                alt='close button'
                className='cursor-pointer'
                onClick={onClose}
              />
            </div>
            <div className='flex flex-col lg:mt-[15px] mt-2 lg:px-0 px-4 lg:mx-0  bg-white rounded-xl w-full'>
              <h3 className='mb-8 text-h-m-d font-bold lg:flex hidden'>
                {activeTab}
              </h3>
              {tabsContentByType[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
