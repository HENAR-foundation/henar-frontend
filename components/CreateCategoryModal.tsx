import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import InputMaterial from './InputMaterial';
import TextAreaMaterial from './TextAreaMaterial';
import * as Yup from 'yup';
import { FormikState, useFormik } from 'formik';
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
import { createStatisticsCategory, deleteStatisticsCategory, updateStatisticsCategory } from 'api/mutations/statisticsCategories';
import { getStatisticsCategory } from 'api/statisticsCategories';
import ButtonWhite from './ButtonWhite';

const CreateProjectSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Название должно содержать минимум 5 символов')
        .max(50, 'Название может содержать максимум 50 символов')
        .required('err_missing_fields'),
    steps: Yup.array().of(Yup.string()).required('err_missing_fields'),
});

const CreateCategoryModal: FC<{ onClose: VoidFunction, id?: string }> = ({ onClose, id }) => {
    const queryClient = useQueryClient();
    const [categoriesModal, toogleCategoriesModal] = useToggle()
    const { data: user } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });
    const { data: category, isFetched } = useQuery({
        enabled: !!id,
        queryFn: () => getStatisticsCategory(id!),
        queryKey: ['statisticsCategory'],
        onSuccess: data => {
            formik.setValues({ title: data.title, steps: data.steps })
        }
    });
    const mutationDeleteCategory = useMutation({
        mutationFn: (id: string) => deleteStatisticsCategory(id),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['statisticsCategories'] });
            PubSub.publish('notification', t("alert_category_deleted"));
            onClose();
        },
    })
    const { refetch: refetchCategories } = useQuery({
        queryKey: ["statisticsCategories"]
    })

    const handleCreateCategory = () => {
        const { title, steps } =
            formik.values;
        if (user) {
            createStatisticsCategory({
                title,
                steps
            }).then(() => {
                queryClient.invalidateQueries({ queryKey: ['statisticsCategories'] });
                refetchCategories();
                PubSub.publish('notification', 'Категория успешно создана');
                onClose();
            });
        }
    };

    const handleUpdateCategory = () => {
        const { title, steps } =
            formik.values;
        if (user) {
            updateStatisticsCategory({
                title,
                steps
            }, id!).then(() => {
                queryClient.invalidateQueries({ queryKey: ['statisticsCategories'] });
                refetchCategories();
                PubSub.publish('notification', 'alert_category_created');
                onClose();
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            steps: [''],
        },
        validateOnChange: false,
        validationSchema: CreateProjectSchema,
        onSubmit: () => {
            if (user) {
                id ? handleUpdateCategory() : handleCreateCategory();
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
                                    {t('new_project')}
                                </h3>
                                <span className='font-bodyLight'>
                                    {t('fill_form_for_project')}
                                </span>
                            </div>
                            <div className='lg:mt-0 mt-7'>
                                {
                                    id
                                        ? (
                                            <div className='flex flex-row'>
                                                <ButtonWhite
                                                    onClick={() => mutationDeleteCategory.mutate(id)}
                                                    className='mr-4'
                                                    kind='M'
                                                    color='inverted'
                                                >
                                                    {t('delete_category')}
                                                </ButtonWhite>
                                                <ButtonPrimary
                                                    onClick={formik.submitForm}
                                                    className=''
                                                    kind='M'
                                                    icon='arrow'
                                                    color='inverted'
                                                >
                                                    {t('update_category')}
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
                                            >
                                                {t('create_category')}
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

                            <div className='flex justify-between lg:flex-row flex-col'>
                                <div className='flex flex-col lg:w-[170px]'>
                                    <span className='text-l'>{t('steps')}</span>
                                </div>
                                <div className='w-full max-w-[480px]'>

                                    {
                                        formik.values.steps.map((step, index) => (
                                            <div className='w-full max-w-[480px] mb-4' key={index}>
                                                <Image
                                                    className='absolute'
                                                    style={{ marginRight: 5, right: 0 }}
                                                    src='/cross-grey.svg'
                                                    width={20}
                                                    height={20}
                                                    alt='slected option icon'
                                                    onClick={() => formik.setFieldValue("steps", formik.values.steps.filter((_, _index) => index != _index))}
                                                />
                                                <TextAreaMaterial
                                                    name={`steps[${index}]`}
                                                    error={t(formik.errors.steps as any)}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.steps[index]}
                                                    placeholder={`${index + 1}.`}
                                                />
                                            </div>
                                        ))
                                    }
                                    <ButtonOutline onClick={() => formik.setFieldValue("steps", [...formik.values.steps, ""])} className='w-full mt-5'>{t("add_step")}</ButtonOutline>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryModal;
