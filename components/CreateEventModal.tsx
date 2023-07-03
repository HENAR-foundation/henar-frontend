import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import InputMaterial from './InputMaterial';
import TextAreaMaterial from './TextAreaMaterial';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import SelectMaterial from './SelectMaterial';
import { createEvent } from 'api/mutations/events';
import { checkSignIn } from 'api/user';
import { getProjects } from 'api/projects';
import ProjectFilesUploader from './ProjectFilesUploader';
import { uploadPhotos } from 'api/mutations/files';
import { ProjectHelpTypes, ProjectPhases, formatFullName } from 'helpers';

const CreateEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Название должно содержать минимум 5 символов')
    .max(50, 'Название может содержать максимум 50 символов')
    .required('err_missing_fields'),
  description: Yup.string().required('err_missing_fields'),
  date: Yup.date().required('err_missing_fields'),
  orgs: Yup.string().required('err_missing_fields'),
  photos: Yup.mixed().required('Required'),
  links: Yup.string().required('Required'),
});

const CreateEventModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });

  const { refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const queryClient = useQueryClient();

  const handleCreateEvent = (photos: string[] = []) => {
    const { description, title, links, orgs, date } =
      formik.values;
    if (user) {
        createEvent({
          cover: photos[0],
          description,
          links,
          title,
          orgs,
          date
        }).then(() => {
          queryClient.invalidateQueries({ queryKey: ['projects'] });
          refetchProjects();
          PubSub.publish('notification', 'Проект успешно создал');
          onClose();
        });
    }
  };

  const mutationPhotos = useMutation({
    mutationFn: (photos: FileList) => uploadPhotos(photos),
    onSuccess: (data) => handleCreateEvent(data),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: new Date(),
      links: '',
      photos: [],
      orgs: '',
    },
    validateOnChange: false,
    validationSchema: CreateEventSchema,
    onSubmit: ({ photos }) => {
      if (user) {
        if (photos.length) {
          mutationPhotos.mutate(photos as unknown as FileList);
        } else {
            console.log(123)
          handleCreateEvent();
        }
      }
    },
  });

  const t = useTranslations();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      data-overlay='true'
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      className='fixed w-full h-full z-[100] left-0 top-0'
    >
      <div
        data-overlay='true'
        className='flex w-full h-full items-center justify-center opacity-1 overflow-auto'
      >
        <div className='flex-col h-full w-full flex items-center overflow-auto  lg:mt-0 relative'>
          <div className=' lg:w-[850px] mt-[100px] min-h-full relative'>
            <Image
              src='/cross-white.svg'
              width={20}
              height={20}
              alt=''
              className='lg:right-[-40px] absolute lg:top-0 top-[-50px] right-[25px] cursor-pointer'
              onClick={onClose}
            />
            <div className='rounded-t-xl overflow-hidden flex lg:flex-row flex-col justify-between  bg-accent1  w-full pb-6 pt-10 lg:px-8 px-4'>
              <div className='text-white flex flex-col'>
                <h3 className='lg:leading-8 leading-7 font-bold text-h-m-m lg:text-h-m-d mb-2'>
                  {t('new_event')}
                </h3>
                <span className='font-bodyLight'>
                  {t('fill_form_for_event')}
                </span>
              </div>
              <div className='lg:mt-0 mt-7'>
                <ButtonPrimary
                  onClick={formik.submitForm}
                  className='lg:w-[180px] w-full'
                  kind='M'
                  icon='arrow'
                  color='inverted'
                  busy={mutationPhotos.isLoading}
                >
                  {t('create_project')}
                </ButtonPrimary>
              </div>
            </div>
            <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('title')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('title-field-description')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <InputMaterial
                    name='title'
                    error={t(formik.errors.title as any)}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder={t('title')}
                  />
                </div>
              </div>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('photo')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('photo_field_description')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <ProjectFilesUploader
                    onChange={formik.setFieldValue}
                    name='photos'
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('orgs')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('title-field-orgs')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='orgs'
                    error={t(formik.errors.orgs as any)}
                    onChange={formik.handleChange}
                    value={formik.values.orgs}
                    placeholder={t('orgs')}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('description')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('title-field-description')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='description'
                    error={t(formik.errors.description as any)}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder={t('description')}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('links')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('title-field-links')}
                  </span>
                    error={t(formik.errors.date as any)}
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='links'
                    error={t(formik.errors.links as any)}
                    onChange={formik.handleChange}
                    value={formik.values.links}
                    placeholder={t('links')}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('date')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('types_date')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <input
                    type='date'
                    className='min-h-[120px]'
                    name='date'
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    placeholder={t('date')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal
