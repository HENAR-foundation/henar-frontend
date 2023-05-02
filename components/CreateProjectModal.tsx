import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import InputMaterial from './InputMaterial';
import TextAreaMaterial from './TextAreaMaterial';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ButtonOutline from './ButtonOutline';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Название должно содержать минимум 5 символов')
    .max(50, 'Название может содержать максимум 50 символов')
    .required('Пожалуйста заполните поле'),
  description: Yup.string().required('Пожалуйста заполните поле'),
  tasks: Yup.string().required('Пожалуйста заполните поле'),
  request: Yup.string().required('Пожалуйста заполните поле'),
});

const CreateProjectModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
    
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      tasks: '',
      request: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = (e: any) => {
    onClose();
  };

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
        <div className='flex flex-col w-[850px] mt-[200px] lg:mt-0 relative'>
          <Image
            src='/cross-white.svg'
            width={20}
            height={20}
            alt=''
            className='right-[-50px] top-4 absolute cursor-pointer'
            onClick={handleClose}
          />
          <div className='rounded-xl overflow-hidden'>
            <div className='flex lg:flex-row flex-col justify-between  bg-accent1  w-full pb-6 pt-10 lg:px-8 px-4'>
              <div className='text-white flex flex-col'>
                <h3 className='lg:leading-8 leading-7 font-bold text-h-m-m lg:text-h-m-d mb-2'>
                  Новый проект
                </h3>
                <span className='font-bodyLight'>
                  Для публикации проекта заполните анкету
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
            <div className='space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
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
                  <ButtonOutline className='w-[163px] lg:mt-0 mt-[30px]'>
                    Загрузите фото
                  </ButtonOutline>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
