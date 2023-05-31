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
import { createProject } from 'api/mutations/projects';
import { checkSignIn } from 'api/user';
import { getProjects } from 'api/projects';
import ProjectFilesUploader from './ProjectFilesUploader';
import { uploadPhotos } from 'api/mutations/files';

const CreateProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Название должно содержать минимум 5 символов')
    .max(50, 'Название может содержать максимум 50 символов')
    .required('Пожалуйста заполните поле'),
  description: Yup.string().required('Пожалуйста заполните поле'),
  tasks: Yup.string().required('Пожалуйста заполните поле'),
  request: Yup.string().required('Пожалуйста заполните поле'),
  photos: Yup.mixed().required('Required'),
});

const CreateProjectModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });

  const { refetch: refetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const queryClient = useQueryClient();

  const handleCreateProject = (photos: string[] = []) => {
    const { description, request, title } = formik.values;
    if (user) {
      createProject({
        covers: photos,
        author: user.full_name.ru,
        description,
        title,
        objective: 'OBJECTIVe',
        tags: [],
        whoIsNeeded: request,
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        refetchProjects();
      });
    }
  };

  const mutationPhotos = useMutation({
    mutationFn: (photos: FileList) => {
      return uploadPhotos(photos);
    },
    onSuccess: (data) => handleCreateProject(data),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      tasks: '',
      request: '',
      photos: [],
    },
    validateOnChange: false,
    validationSchema: CreateProjectSchema,
    onSubmit: ({ photos }) => {
      if (user) {
        if (photos.length) {
          mutationPhotos.mutate(photos as unknown as FileList);
        } else {
          handleCreateProject();
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
          <div className=' w-[850px] mt-[100px] min-h-full relative'>
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
                  {t('new_project')}
                </h3>
                <span className='font-bodyLight'>
                  {t('fill_form_for_project')}
                </span>
              </div>
              <div className='lg:mt-0 mt-7'>
                <ButtonPrimary
                  onClick={formik.submitForm}
                  className='lg:w-[180px] w-full'
                  kind='M'
                  icon='arrow'
                  color='inverted'
                >
                  Опубликовать
                </ButtonPrimary>
              </div>
            </div>
            <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Название</span>
                  <span className='font-bodyLight text-a-ss'>
                    Будет отображаться на карточке проекта
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <InputMaterial
                    name='title'
                    error={formik.errors.title}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder='Название'
                  />
                </div>
              </div>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Фото</span>
                  <span className='font-bodyLight text-a-ss'>
                    Загрузите фотографии для обложки проекта
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <ProjectFilesUploader
                    onChange={formik.setFieldValue}
                    name='photos'
                    value={formik.values.photos}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Стадия проекта</span>
                  <span className='font-bodyLight text-a-ss'>
                    На каком этапе находится проект ?
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <SelectMaterial
                    options={[
                      { label: 'Сделан', val: 'rus' },
                      { label: 'Не сделан', val: 'us' },
                    ]}
                    defaultVal='Выберите стадию'
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Описание</span>
                  <span className='font-bodyLight text-a-ss'>
                    Будет отображаться на карточке проекта
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='description'
                    error={formik.errors.description}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder='Описание'
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Задачи</span>
                  <span className='font-bodyLight text-a-ss'>
                    Будет отображаться на карточке проекта
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='tasks'
                    error={formik.errors.tasks}
                    onChange={formik.handleChange}
                    value={formik.values.tasks}
                    placeholder='Задачи'
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Запрос</span>
                  <span className='font-bodyLight text-a-ss'>
                    Как можно почучаствовать в проекте?
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='request'
                    error={formik.errors.request}
                    onChange={formik.handleChange}
                    value={formik.values.request}
                    placeholder='Запрос'
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Как помочь проекту ?</span>
                  <span className='font-bodyLight text-a-ss'>
                    Как можно почучаствовать в проекте?
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <SelectMaterial
                    options={[
                      { label: 'Сделан', val: 'rus' },
                      { label: 'Не сделан', val: 'us' },
                    ]}
                    defaultVal='Возможности для участия'
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

export default CreateProjectModal;
