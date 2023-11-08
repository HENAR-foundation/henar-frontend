import { checkSignIn } from 'api/user';
import React, { useEffect } from 'react';
import { resetPassword } from 'api/mutations/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GetServerSideProps } from 'next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToggle } from 'usehooks-ts';
import { useRouter } from 'next/router';
import InputMaterial from "components/InputMaterial"
import ButtonPrimary from "components/ButtonPrimary"

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(5, 'err_password')
        .max(50, 'err_password')
        .required('err_missing_fields'),
    passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password')],
        'pasword_not_match'
    ),
});

const ResetPasswordPage = () => {
    const { push } = useRouter();
    const router = useRouter();
    const { token } = router.query;
    const email = router.query?.email as string
    const t = useTranslations();
    const queryClient = useQueryClient();
    const [modal, toggleModal] = useToggle()

    const resetPasswordMutation = useMutation({
        onSuccess: (result) => {
            if (result) {
                PubSub.publish('notification', t("alert_password_changed"));
                push('/login');
                // queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
                // queryClient.refetchQueries({ queryKey: ['isSignedIn'] });
            }
        },
        onError: (error: any) => {
            PubSub.publish('notification', t('alert_password_change_error'));
        },
        mutationFn: ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) =>
            resetPassword({ password, passwordConfirm, code: token as string }),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        },
        validateOnChange: false,
        validationSchema: ResetPasswordSchema,
        onSubmit: (data) => {
            resetPasswordMutation.mutate(data);
        },
    });


    return (
        <div className='h-full flex items-center justify-center'>
            <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
                <h1 className='text-h-m-d font-bold mb-8'>{t('update_password')}</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col lg:space-y-8 space-y-[20px]'>
                        <div className='flex w-full lg:flex-row flex-col'>
                            <div className='flex flex-1 space-y-3 w-full flex-col'>
                                <InputMaterial
                                    type='password'
                                    name='password'
                                    label={t('new_password')!}
                                    error={t(formik.errors.password as any)}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <InputMaterial
                                    error={t(formik.errors.passwordConfirm as any)}
                                    onChange={formik.handleChange}
                                    value={formik.values.passwordConfirm}
                                    name='passwordConfirm'
                                    type='password'
                                    label={t('reenter_password')!}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end items-end h-[100px]'>
                            <ButtonPrimary
                                busy={resetPasswordMutation.isLoading}
                                type='submit'
                            >{t("reset_password")}
                            </ButtonPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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

export default ResetPasswordPage;
