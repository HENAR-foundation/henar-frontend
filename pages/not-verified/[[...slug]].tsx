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

const convertSlugToString = (slug: string | string[] | undefined) => {
    if (typeof slug === 'string') {
        return slug;
    } else if (Array.isArray(slug)) {
        return slug.join('-');
    } else {
        return '';
    }
};

const NotVerifiedPage = () => {
    const { push } = useRouter();
    const router = useRouter();
    const { slug } = router.query
    const email = router.query?.email as string
    const code = convertSlugToString(slug)
    const t = useTranslations();
    const queryClient = useQueryClient();
    const [modal, toggleModal] = useToggle()

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
        mutationFn: ({ email, code }: { email?: string; code?: string }) =>
            resendVerificationEmail({ email, code }),
    });

    return (
        <>
            <Head>
                <title>{t('verify_email')}</title>
            </Head>
            <div className='h-full flex items-center justify-center'>
                <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
                    <h1 className='text-h-m-d font-bold mb-8'>{t('verify_email')}</h1>
                    <div className='mb-14 flex justify-center items-center '>
                        <p className='text-m'>{t('please_verify_email_to_login')}</p>
                    </div>
                    {email || code ? <div className="flex justify-center items-center mt-5">
                        <p className='text-m'>{t('didnt_received_email')}</p>
                        <div onClick={() => resendVerificationEmaillMutation.mutate({ email, code })} className='text-m ml-2 cursor-pointer text-accent1'>
                            {t('resend')}
                        </div>
                    </div> : null}
                </div>
            </div>
            {modal && <ResendCodeModal onClose={toggleModal} onClick={resendVerificationEmaillMutation} isLoading={resendVerificationEmaillMutation.isLoading} code={code} email={email} />}
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

export default NotVerifiedPage;
