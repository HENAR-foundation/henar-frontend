import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import InputMaterial from './InputMaterial';
import ProjectCard from './ProjectCard';
import TextAreaMaterial from './TextAreaMaterial';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import { useTranslations } from 'next-intl';
import PhotoUploader from './PhotoUploader';
import { checkSignIn } from 'api/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'api/mutations/user';
import ButtonPrimary from './ButtonPrimary';
import { uploadPhotos } from 'api/mutations/files';
import NotAllowed from './NotAllowed';
import Tag from './Tag';
import AvatarCircle from './AvatarCircle';

enum tabTypes {
  Profile = 'profile',
  Projects = 'projects',
  Password = 'reset_your_password',
}
type IS = keyof typeof tabTypes;

const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required('err_missing_fields'),
  lastName: Yup.string().required('err_missing_fields'),
  location: Yup.string().required('err_missing_fields'),
  job: Yup.string().required('err_missing_fields'),
  about: Yup.string().required('err_missing_fields'),
});

const AboutTab: FC = () => {
  const t = useTranslations();
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
    onSuccess: () => {
      if (user) {
        formik.setValues({
          name: user?.full_name.en.split(' ')[0],
          about: user.description,
          lastName: user.full_name.en.split(' ')[1],
          location: user.location,
          job: user.job,
          avatar: user.avatar,
        });
      }
    },
  });

  const mutationPhotos = useMutation({
    mutationFn: (photos: FileList) => uploadPhotos(photos),
    onSuccess: (data) => handlUpdateUser(''),
  });

  const handlUpdateUser = (avatar?: string) => {
    const { name, lastName, job, about, location } = formik.values;
    if (user) {
      updateUser({
        ...user,
        avatar: avatar || '',
        full_name: { ...user.full_name, en: `${name} ${lastName}` },
        job,
        location,
        description: about,
      }).then(() => {
        PubSub.publish('notification', 'Профиль успешно обновлен');
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
      lastName: '',
      location: '',
      job: '',
      about: '',
    },
    validateOnChange: false,
    validationSchema: UpdateProfileSchema,
    onSubmit: ({ avatar }) => {
      if (avatar) {
        mutationPhotos.mutate(avatar as unknown as FileList);
      } else {
        handlUpdateUser();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
        <div className='flex w-full lg:flex-row flex-col'>
          <span className='w-[230px] mt-2 lg:mb-0 mb-3'>Photo</span>
          <div className='flex flex-1 w-full flex-col'>
            <PhotoUploader onChange={formik.setFieldValue} name='avatar' />
          </div>
        </div>
        <div className='flex w-full lg:flex-row flex-col'>
          <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
            {t('what_is_your_name')}
          </span>
          <div className='flex flex-1 space-y-3 w-full flex-col'>
            <InputMaterial
              name='name'
              value={formik.values.name}
              error={formik.errors.name}
              onChange={formik.handleChange}
              label={t('name')}
            />
            <InputMaterial
              name='lastName'
              value={formik.values.lastName}
              error={formik.errors.lastName}
              onChange={formik.handleChange}
              label={t('last_name')}
            />
          </div>
        </div>
        <NotAllowed>
          <div className='flex w-full lg:flex-row flex-col'>
            <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
              {t('where_are_you_from')}
            </span>
            <div className='flex flex-1 flex-col w-full'>
              <InputMaterial disabled label={t('input_city')} />
            </div>
          </div>
        </NotAllowed>
        <div className='flex w-full lg:flex-row flex-col'>
          <span className='w-[230px] mt-2 lg:mb-0 mb-3'>
            {t('your_occupation')}
          </span>
          <div className='flex flex-1 flex-col w-full'>
            <InputMaterial
              name='job'
              value={formik.values.job}
              error={formik.errors.job}
              onChange={formik.handleChange}
              label={t('current_position')}
            />
          </div>
        </div>
        <div className='flex w-full lg:flex-row flex-col'>
          <span className='w-[230px] mt-2 lg:mb-0 mb-3'>{t('about')}</span>
          <div className='flex flex-1 flex-col w-full'>
            <TextAreaMaterial
              name='about'
              value={formik.values.about}
              error={formik.errors.about}
              onChange={formik.handleChange}
              label={t('about')}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row-reverse mt-[65px] w-full'>
        <ButtonPrimary type='submit' kind='M' className='w-[170px]'>
          Сохранить
        </ButtonPrimary>
      </div>
    </form>
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
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });
  const ProjectsTab = () => {
    const { data } = useQuery({ queryFn: getProjects, queryKey: ['projects'] });
    const projects = data?.filter(
      ({ _id }) =>
        !!Object.keys(user?.user_projects.created_projects || {}).includes(_id)
    );
    console.info(
      Object.keys(user?.user_projects.created_projects || {}),
      projects,
      'ASSSS',
      data
    );
    return (
      <>
        {projects?.map(({ title, views, successful_applicants }) => (
          <div className='flex flex-col rounded-l bg-white p-[20px] shadow-sm'>
            <div className='flex space-x-6'>
              <span className='text-accent1'>{views || 0} views</span>
              <span className='text-accent1'>
                {successful_applicants?.length || 0} views
              </span>
              <span className='text-error'>On moderation</span>
            </div>
            <span className='text-l mt-2'>{title.en}</span>
            <span className='mt-3 w-[96px] h-[24px]'>
              <Tag name='Medicine' />
            </span>
            <div className='flex mt-10'>
              <AvatarCircle />
              <div className='flex flex-col ml-[15px] mr-6'>
                <span>{user?.full_name.en}</span>
                <span className='font-thin text-a-ss'>{user?.job}</span>
              </div>
            </div>
          </div>
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
