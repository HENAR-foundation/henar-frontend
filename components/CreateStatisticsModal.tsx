import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
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
import { ProjectHelpTypes, ProjectPhases, formatFullName } from 'helpers';
import { createEvent } from 'api/mutations/events';
import { getEvents } from 'api/events';
import ButtonBase from './ButtonBase';
import ButtonOutline from './ButtonOutline';
import { useToggle } from 'usehooks-ts';
import CreateCategoryModal from './CreateCategoryModal';
import { getStatisticsCategories } from 'api/statisticsCategories';
import { createStatistics, deleteStatistics, updateStatistics } from 'api/mutations/statistics';
import { getStatistic, getStatistics } from 'api/statistics';

const CreateStatisticsSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Название должно содержать минимум 5 символов')
        .max(100, 'Название может содержать максимум 100 символов')
        .required('err_missing_fields'),
    category: Yup.string().required('err_missing_fields'),
    value: Yup.string().required('err_missing_fields').max(50, 'Название может содержать максимум 50 символов'),
    source: Yup.string().required('err_missing_fields'),
});

const CreateStatisticsModal: FC<{ onClose: VoidFunction, id?: string }> = ({ onClose, id }) => {

    const [categoryOnEdit, setCategoryOnEdit] = useState<string | undefined>(undefined)
    const [categoriesModal, toogleCategoriesModal] = useToggle()
    const { data: user } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        queryFn: getStatisticsCategories,
        queryKey: ['statisticsCategories'],
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });

    const { data: stat } = useQuery({
        queryFn: () => getStatistic(id || ""),
        queryKey: ["stat"],
        enabled: !!id,
        onSuccess: stat => {
            formik.setValues({
                title: stat.title,
                value: stat.value,
                source: stat.source,
                category: stat.category,
            })
        }
    })

    const mutationCreateStatistics = useMutation({
        mutationFn: createStatistics,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
            PubSub.publish('notification', t("alert_create_statistics_success"));
            onClose();
        }
    })
    const mutationDeleteStatistics = useMutation({
        mutationFn: deleteStatistics,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
            PubSub.publish('notification', t("alert_delete_statistics_success"));
            onClose();
        }
    })
    const mutationUpdateStatistics = useMutation({
        mutationFn: (values) => updateStatistics(values as any, id!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistics'] });
            PubSub.publish('notification', t("alert_update_statistics_success"));
            onClose();
        }
    })

    const handleCreateCategory = () => {
        setCategoryOnEdit(undefined)
        toogleCategoriesModal()
    }
    const handleUpdateCategory = (id: string) => {
        setCategoryOnEdit(id)
        toogleCategoriesModal()
    }

    const handleCreateStatistics = () => {
        if (user) {
            mutationCreateStatistics.mutate(formik.values)
        }
    };
    const handleDeleteStatistics = () => {
        if (user) {
            mutationDeleteStatistics.mutate(id!)
        }
    };
    const handleUpdateStatistics = (values: any) => {
        if (user) {
            mutationUpdateStatistics.mutate(values)
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            value: '',
            source: '',
            category: ''
        },
        validateOnChange: false,
        validationSchema: CreateStatisticsSchema,
        onSubmit: () => {
            if (user) {
                handleCreateStatistics();
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
            {categoriesModal && <CreateCategoryModal onClose={toogleCategoriesModal} id={categoryOnEdit} />}
            <div
                data-overlay='true'
                className='flex w-full h-full items-center justify-center opacity-1 overflow-auto'
            >
                <div className='flex-col h-full w-full flex items-center overflow-auto lg:mt-0 relative'>
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
                                    {t('new_statistics')}
                                </h3>
                                <span className='font-bodyLight'>
                                    {t('new_statistics_desc')}
                                </span>
                            </div>
                            <div className='lg:mt-0 mt-7'>
                                {
                                    id
                                        ? (
                                            <div className='flex flex-row'>
                                                <ButtonPrimary
                                                    onClick={handleDeleteStatistics}
                                                    className='lg:w-[180px] w-full mr-4'
                                                    kind='M'
                                                    icon='arrow'
                                                    color='inverted'
                                                    busy={mutationDeleteStatistics.isLoading}
                                                >
                                                    {t('delete_statistics')}
                                                </ButtonPrimary>
                                                <ButtonPrimary
                                                    onClick={() => handleUpdateStatistics(formik.values)}
                                                    className='lg:w-[180px] w-full'
                                                    kind='M'
                                                    icon='arrow'
                                                    color='inverted'
                                                    busy={mutationUpdateStatistics.isLoading}
                                                >
                                                    {t('update_statistics')}
                                                </ButtonPrimary>
                                            </div>
                                        )
                                        : (
                                            <ButtonPrimary
                                                onClick={formik.submitForm}
                                                className='lg:w-[180px] w-full'
                                                kind='M'
                                                icon='arrow'
                                                color='inverted'
                                                busy={mutationCreateStatistics.isLoading}
                                            >
                                                {t('create_statistics')}
                                            </ButtonPrimary>
                                        )
                                }
                            </div>
                        </div>
                        <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6 pb-14'>
                            <div className='flex justify-between lg:flex-row flex-col'>
                                <div className='flex flex-col lg:w-[170px]'>
                                    <span className='text-l'>{t('title')}</span>
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
                            <div className='lg:flex-row flex-col flex justify-between'>
                                <div className='flex flex-col lg:w-[170px]'>
                                    <span className='text-l'>{t('category')}</span>
                                </div>
                                <div className='w-full max-w-[480px]'>
                                    <SelectMaterial
                                        withEditButton
                                        onEditButton={(id: string) => handleUpdateCategory(id)}
                                        onChange={formik.setFieldValue}
                                        name='category'
                                        options={!categories ? [] : [...categories.map(cat => ({ label: cat.title, val: cat.id })), () => <ButtonOutline onClick={handleCreateCategory} className='w-full'>{t('create_category')}</ButtonOutline>]}
                                        defaultVal={t('select_category')}
                                    />
                                </div>
                            </div>
                            <div className='lg:flex-row flex-col flex justify-between'>
                                <div className='flex flex-col lg:w-[170px]'>
                                    <span className='text-l'>{t('value')}</span>
                                </div>
                                <div className='w-full max-w-[480px]'>
                                    <InputMaterial
                                        name='value'
                                        error={t(formik.errors.value as any)}
                                        onChange={formik.handleChange}
                                        value={formik.values.value}
                                        placeholder={t('value')}
                                    />
                                </div>
                            </div>
                            <div className='lg:flex-row flex-col flex justify-between'>
                                <div className='flex flex-col lg:w-[170px]'>
                                    <span className='text-l'>{t('source')}</span>
                                </div>
                                <div className='w-full max-w-[480px]'>
                                    <InputMaterial
                                        name='source'
                                        error={t(formik.errors.source as any)}
                                        onChange={formik.handleChange}
                                        value={formik.values.source}
                                        placeholder={t('source')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CreateStatisticsModal;
