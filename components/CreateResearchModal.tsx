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
import { createResearch, deleteResearch, updateResearch } from 'api/mutations/researches';
import { getResearch, getResearches } from 'api/researches';
import ButtonWhite from './ButtonWhite';

const CreateResearchSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Название должно содержать минимум 5 символов')
        .max(50, 'Название может содержать максимум 50 символов')
        .required('err_missing_fields'),
    source: Yup.string().required('err_missing_fields'),
    link: Yup.string().required('err_missing_fields'),
});

const CreateResearchModal: FC<{ onClose: VoidFunction, id?: string }> = ({ onClose, id }) => {
    const queryClient = useQueryClient();
    const { data: user } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });

    const { data: researches, refetch: refetchResearches } = useQuery({
        queryKey: ['researches'],
        queryFn: getResearches,
    });

    const { data: research } = useQuery({
        queryKey: ['research'],
        queryFn: () => getResearch(id!),
        enabled: !!id,
        onSuccess: (data) => {
            console.log(data)
            formik.setValues(data)
        }
    });

    const mutationCreateResearch = useMutation({
        mutationFn: (values: any) => createResearch(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['researches'] });
            refetchResearches()
            PubSub.publish('notification', t("alert_create_research"));
            onClose();
        }
    })
    const mutationUpdateResearch = useMutation({
        mutationFn: (values: any) => updateResearch(values, id!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['researches'] });
            refetchResearches()
            PubSub.publish('notification', t("alert_update_research"));
            onClose();
        }
    })
    const mutationDeleteResearch = useMutation({
        mutationFn: () => deleteResearch(id!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['researches'] });
            refetchResearches()
            PubSub.publish('notification', t("alert_delete_research"));
            onClose();
        }
    })

    const handleCreateResearch = () => {
        if (user) {
            mutationCreateResearch.mutate(formik.values)
        }
    };
    const handleUpdateResearch = () => {
        if (user) {
            mutationUpdateResearch.mutate(formik.values)
        }
    };
    const handleDeleteResearch = () => {
        if (user) {
            mutationDeleteResearch.mutate()
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            source: '',
            link: '',
        },
        validateOnChange: false,
        validationSchema: CreateResearchSchema,
        onSubmit: () => {
            if (user) {
                id ? handleUpdateResearch() : handleCreateResearch();
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
                                    {t('new_research')}
                                </h3>
                                <span className='font-bodyLight'>
                                    {t('new_research_desc')}
                                </span>
                            </div>
                            <div className='lg:mt-0 mt-7'>
                                {
                                    id
                                        ? (
                                            <div className='flex flex-row'>
                                                <ButtonWhite
                                                    onClick={handleDeleteResearch}
                                                    className='mr-4'
                                                    kind='M'
                                                    color='inverted'
                                                >
                                                    {t('delete_research')}
                                                </ButtonWhite>
                                                <ButtonPrimary
                                                    onClick={formik.submitForm}
                                                    className=''
                                                    kind='M'
                                                    icon='arrow'
                                                    color='inverted'
                                                >
                                                    {t('update_research')}
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
                                                {t('create_research')}
                                            </ButtonPrimary>
                                        )
                                }
                            </div>
                        </div>
                        <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
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
                                    <span className='text-l'>{t('link')}</span>
                                </div>
                                <div className='w-full max-w-[480px]'>
                                    <InputMaterial
                                        name='link'
                                        error={t(formik.errors.link as any)}
                                        onChange={formik.handleChange}
                                        value={formik.values.link}
                                        placeholder={t('link')}
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
        </div>
    );
};

export default CreateResearchModal;
