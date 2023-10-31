import { checkSignIn } from 'api/user';
import React, { useEffect } from 'react';
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

const VerifyEmailPage = () => {
    const { push } = useRouter();
    const router = useRouter();
    const { slug } = router.query
    const email = router.query?.email as string
    const code = convertSlugToString(slug)
    const t = useTranslations();
    const queryClient = useQueryClient();
    const [modal, toggleModal] = useToggle()


    const verifyEmailMutation = useMutation({
        onSuccess: (result) => {
            if (result) {
                PubSub.publish('notification', t("alert_email_verified"));
                push('/login');
                // queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
                // queryClient.refetchQueries({ queryKey: ['isSignedIn'] });
    
            }
        },
        onError: (error: any) => {
            if (error?.response?.data === 'verification code has expired') {
                PubSub.publish('notification', t("code_expired"));
                push('/not-verified');
            } else {
                PubSub.publish('notification', t('invalid_code'));
                push('/not-verified');
            }

        },
        mutationFn: ({ code }: { code: string; }) =>
            verifyEmail(code),
    });

    useEffect(() => {
        if (code) {
            verifyEmailMutation.mutate({ code });
        }
    }, [code])

    return (
        <>
            {verifyEmailMutation.isLoading ?
                <div className='h-full flex items-center justify-center'>
                    <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
                        <h1 className='text-h-m-d font-bold mb-4'>{`${t('verificating_email')}...`}</h1>
                    </div>
                </div> : null}
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
