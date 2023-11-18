import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
import React from 'react';
import { signIn } from 'api/mutations/auth';
import { GetServerSideProps } from 'next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const SigninSchema = Yup.object().shape({
  password: Yup.string().required('err_missing_fields'),
  email: Yup.string()
    .email('err_invalid_email_format')
    .required('err_missing_fields'),
});

const LoginPage = () => {
  const { push } = useRouter();
  const t = useTranslations();
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    onSuccess: (result) => {
      if (result) {
        PubSub.publish('notification', t("alert_login"));
        queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
        queryClient.refetchQueries({ queryKey: ['isSignedIn'] });
        push('/projects');
      }
    },
    onError: (error: any, variables) => {
      if (error?.response?.data?.message === 'email not verified') {
        PubSub.publish('notification', t("email_not_verified"));
        push({ pathname: '/not-verified', query: { email: variables?.email } }, '/not-verified');
      } else {
        formik.setErrors({ password: 'Пароль или email введены неверно' });
      }
    },
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: ({ email, password }) => {
      signInMutation.mutate({ email, password });
    },
  });


  return (
    <>
      <Head>
        <title>{t('log_in')}</title>
      </Head>
      <div className='h-full flex items-center justify-center'>
        <form onSubmit={formik.handleSubmit}>
          <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
            <h1 className='text-h-m-d font-bold mb-4'>{t('log_in')}</h1>
            <div className='space-y-3 mb-14'>
              <InputMaterial
                error={t(formik.errors.email as any)}
                label='Email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <InputMaterial
                error={t(formik.errors.password as any)}
                type='password'
                label={t('password')}
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {/* <div className='mt-5 text-m text-accent1'>
                {t('forgot_password')}
              </div> */}
            </div>

            <ButtonPrimary
              busy={signInMutation.isLoading}
              type='submit'
              icon='arrow'
              kind='M'
            >
              {t('sign_in')}
            </ButtonPrimary>
          </div>
        </form>
      </div>
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

export default LoginPage;
