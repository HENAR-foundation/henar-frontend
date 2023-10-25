import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import ResendCodeModal from 'components/ResendCodeModal';
import { checkSignIn } from 'api/user';
import { useFormik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
import React from 'react';
import { verifyEmail, resendVerificationEmail } from 'api/mutations/auth';
import { GetServerSideProps } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToggle } from 'usehooks-ts';
import { useRouter } from 'next/router';

const SigninSchema = Yup.object().shape({
    code: Yup.string().required('err_missing_fields'),
});

const convertSlugToString = (slug: string | string[] | undefined) => {
    if (typeof slug === 'string') {
        return slug;
    } else if (Array.isArray(slug)) {
        return slug.join('-');
    } else {
        return '';
    }
};

const VerifyEmailPage = () => {
    const { push } = useRouter();
    const router = useRouter();
    const { slug } = router.query
    const email = router.query?.email as string
    const code = convertSlugToString(slug)
    const t = useTranslations();
    const queryClient = useQueryClient();
    const [modal, toggleModal] = useToggle()

    const { data: user, refetch: refetchMe } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });

    const verifyEmailMutation = useMutation({
        onSuccess: (result) => {
            if (result) {
                PubSub.publish('notification', t("alert_email_verified"));
                // queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
                // queryClient.refetchQueries({ queryKey: ['isSignedIn'] });
                push('/login');
            }
        },
        onError: (error: any) => {
            if (error?.response?.data === 'verification code has expired') {
                PubSub.publish('notification', t("code_expired"));
            }
            formik.setErrors({ code: t('invalid_code') });
        },
        mutationFn: ({ code }: { code: string; }) =>
            verifyEmail(code),
    });

    const resendVerificationEmaillMutation = useMutation({
        onSuccess: (result) => {
            toggleModal()
            // PubSub.publish('notification', t("email_sent"));
            // queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
            // queryClient.refetchQueries({ queryKey: ['isSignedIn'] });
            // push('/login');
        },
        onError: (error: any) => {
            if (error?.response?.data === 'resend limit exceeded') {
                PubSub.publish('notification', t("resend_limit_exceeded"));
            } else {
                PubSub.publish('notification', t("error_email_send"));
            }
        },
        mutationFn: ({ email }: { email: string; }) =>
            resendVerificationEmail(email),
    });

    const formik = useFormik({
        initialValues: {
            code,
        },
        validateOnChange: false,
        validationSchema: SigninSchema,
        onSubmit: ({ code }) => {
            verifyEmailMutation.mutate({ code });
        },
    });


    return (
        <>
            <Head>
                <title>{t('verify_email')}</title>
            </Head>
            <div className='h-full flex items-center justify-center'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
                        <h1 className='text-h-m-d font-bold '>{t('verify_email')}</h1>
                        <span className='text-s font-thin inline-block mb-6'>
                            {t('please_enter_code')}
                        </span>
                        <div className='space-y-3 mb-14'>
                            <InputMaterial
                                error={t(formik.errors.code as any)}
                                type='text'
                                label={t('code')}
                                name='code'
                                onChange={formik.handleChange}
                                value={formik.values.code}
                            />
                        </div>
                        <ButtonPrimary
                            busy={verifyEmailMutation.isLoading}
                            type='submit'
                            icon='arrow'
                            kind='M'
                        >
                            {t('continue')}
                        </ButtonPrimary>
                        {email ? <div className="flex justify-center items-center mt-5 " >
                            <p className='text-m'>{t('didnt_received_email')}</p>
                            <div onClick={() => resendVerificationEmaillMutation.mutate({ email: email })} className='text-m ml-2 cursor-pointer text-accent1'>
                                {t('resend')}
                            </div>
                        </div> : null}
                    </div>
                </form>
            </div>
            {modal && <ResendCodeModal onClose={toggleModal} onClick={resendVerificationEmaillMutation} isLoading={resendVerificationEmaillMutation.isLoading} email={email} />}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            messages: {
                ...(await import(`../../messages/${locale}.json`)).default,
                ...(await import(`../../messages/formErrors/${locale}.json`)).default,
            },
        },
    };
};

export default VerifyEmailPage;
