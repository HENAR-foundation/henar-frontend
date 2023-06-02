import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import InputMaterial from './InputMaterial';
import ProjectCard from './ProjectCard';
import TextAreaMaterial from './TextAreaMaterial';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import { useTranslations } from 'next-intl';
import PhotoUploader from './PhotoUploader';
import { checkSignIn } from 'api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

enum tabTypes {
  Profile = 'profile',
  Projects = 'projects',
  Password = 'reset_your_password',
}
type IS = keyof typeof tabTypes;

const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required('Пожалуйста заполните поле'),
  lastName: Yup.string().required('Пожалуйста заполните поле'),
  location: Yup.string().required('Пожалуйста заполните поле'),
  job: Yup.string().required('Пожалуйста заполните поле'),
  about: Yup.string().required('Пожалуйста заполните поле'),
});

const AboutTab: FC = () => {
  const t = useTranslations();
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      location: '',
      job: '',
      about: '',
    },
    validateOnChange: false,
    validationSchema: UpdateProfileSchema,
    onSubmit: ({ name, lastName }) => {
      if (user) {
        // updateUser({
        //   ...user,
        //   full_name: { ...user.full_name, en: `${name} ${lastName}` },
        // }).then(() => {
        //   queryClient
        //     .invalidateQueries({ queryKey: ['isSignedIn'] })
        //     .then(() => {
        //       PubSub.publish('notification', 'Профиль успешно обновлен');
        //     });
        // });
      }
    },
  });
  return (
    <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
      <div className='flex w-full lg:flex-row flex-col'>
        <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Фотография</span>
        <div className='flex flex-1 w-full flex-col'>
          <PhotoUploader />
        </div>
      </div>
      <div className='flex w-full lg:flex-row flex-col'>
        <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
          {t('what_is_your_name')}
        </span>
        <div className='flex flex-1 space-y-3 w-full flex-col'>
          <InputMaterial defaultValue={user?.full_name.en} label={t('name')} />
          <InputMaterial label={t('last_name')} />
        </div>
      </div>
      <div className='flex w-full lg:flex-row flex-col'>
        <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
          {t('where_are_you_from')}
        </span>
        <div className='flex flex-1 flex-col w-full'>
          <InputMaterial label={t('input_city')} />
        </div>
      </div>
      <div className='flex w-full lg:flex-row flex-col'>
        <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
          {t('your_occupation')}
        </span>
        <div className='flex flex-1 flex-col w-full'>
          <InputMaterial label={t('current_position')} />
        </div>
      </div>
      <div className='flex w-full lg:flex-row flex-col'>
        <span className='w-[230px] mt-2 lg:mb-0 mb-3'>{t('about')}</span>
        <div className='flex flex-1 flex-col w-full'>
          <TextAreaMaterial label={t('about')} />
        </div>
      </div>
    </div>
  );
};

const PasswordTab: FC<{ t: any }> = ({ t }) => (
  <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>{t('old_password')}</span>
      <div className='flex flex-1 space-y-3 w-full flex-col'>
        <InputMaterial label={t('password')} type='password' />
      </div>
    </div>
    <div className='flex w-full lg:flex-row flex-col'>
      <span className='w-[230px] mt-2 lg:mb-0 mb-3'>{t('new_password')}</span>
      <div className='flex flex-1 space-y-3 w-full flex-col'>
        <InputMaterial label={t('password')} type='password' />
        <InputMaterial label={t('new_password')} type='password' />
      </div>
    </div>
  </div>
);

const ProfileModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const [activeTab, toggleTab] = useState<tabTypes>(tabTypes.Profile);
  const ProjectsTab = () => {
    const { data } = useQuery({ queryFn: getProjects, queryKey: ['projects'] });
    return (
      <>
        {data?.map((item) => (
          <ProjectCard data={item} withShadow />
        ))}
      </>
    );
  };

  const t = useTranslations();

  const tabsContentByType: { [key in tabTypes]?: JSX.Element } = {
    [tabTypes.Profile]: <AboutTab />,
    [tabTypes.Password]: <PasswordTab t={t} />,
    [tabTypes.Projects]: ProjectsTab(),
  };

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
              <h3 className='mb-8 text-h-m-d font-bold'>{t('settings')}</h3>
              {(Object.keys(tabTypes) as Array<IS>).map((tab) => (
                <span
                  onClick={() => toggleTab(tabTypes[tab])}
                  className={`cursor-pointer p-4 w-full ${
                    activeTab === tabTypes[tab] ? 'bg-white' : ''
                  } rounded-l`}
                >
                  {t(tabTypes[tab])}
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
                {t(activeTab)}
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
