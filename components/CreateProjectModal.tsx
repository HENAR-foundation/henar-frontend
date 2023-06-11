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
import { ProjectHelpTypes, ProjectPhases } from 'helpers';

const CreateProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Название должно содержать минимум 5 символов')
    .max(50, 'Название может содержать максимум 50 символов')
    .required('err_missing_fields'),
  description: Yup.string().required('err_missing_fields'),
  tasks: Yup.string().required('err_missing_fields'),
  request: Yup.string().required('err_missing_fields'),
  photos: Yup.mixed().required('Required'),
  how_to_help_the_project: Yup.string().required('Required'),
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
    const { description, request, title, how_to_help_the_project } =
      formik.values;
    if (user) {
      console.info(formik.values);
      //   createProject({
      //     covers: photos,
      //     author: formatFullName(user),
      //     description,
      //     how_to_help_the_project,
      //     title,
      //     objective: 'OBJECTIVe',
      //     tags: [],
      //     whoIsNeeded: request,
      //   }).then(() => {
      //     queryClient.invalidateQueries({ queryKey: ['projects'] });
      //     refetchProjects();
      //     PubSub.publish('notification', 'Проект успешно создал');
      //     onClose();
      //   });
    }
  };

  const mutationPhotos = useMutation({
    mutationFn: (photos: FileList) => uploadPhotos(photos),
    onSuccess: (data) => handleCreateProject(data),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      tasks: '',
      request: '',
      photos: [],
      how_to_help_the_project: '',
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
                  <span className='text-l'>{t('project_phase')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('project_phase_field_description')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <SelectMaterial
                    options={(
                      Object.keys(
                        ProjectPhases
                      ) as (keyof typeof ProjectPhases)[]
                    ).map((val) => ({
                      label: ProjectPhases[val],
                      val,
                    }))}
                    defaultVal='Select project stadia'
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
                  <span className='text-l'>{t('objectives')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('title-field-description')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='tasks'
                    error={t(formik.errors.tasks as any)}
                    onChange={formik.handleChange}
                    value={formik.values.tasks}
                    placeholder={t('objectives')}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('help_project_question')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('types_needs')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <SelectMaterial
                    onChange={formik.setFieldValue}
                    name='how_to_help_the_project'
                    options={(
                      Object.keys(
                        ProjectHelpTypes
                      ) as (keyof typeof ProjectHelpTypes)[]
                    ).map((val) => ({
                      label: ProjectHelpTypes[val],
                      val,
                    }))}
                    defaultVal={t('help_project_question')}
                  />
                </div>
              </div>
              <div className='lg:flex-row flex-col flex justify-between'>
                <div className='flex flex-col lg:w-[170px]'>
                  <span className='text-l'>{t('request')}</span>
                  <span className='font-bodyLight text-a-ss'>
                    {t('types_needs')}
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='min-h-[120px]'
                    name='request'
                    error={t(formik.errors.request as any)}
                    onChange={formik.handleChange}
                    value={formik.values.request}
                    placeholder={t('request')}
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
