import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';
import { signUp } from 'api/mutations/auth';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .max(50, 'Пароль может содержать максимум 50 символов')
    .required('err_missing_fields'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Пароли не совпадают'
  ),
  email: Yup.string()
    .email('err_invalid_email_format')
    .required('err_missing_fields'),
});

const RegistrationPage = () => {
  const { push } = useRouter();
  const signUpMutation = useMutation({
    onSuccess: () => {
      PubSub.publish('notification', 'Registered successfully');
      push('/login');
    },
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: (data) => {
      signUpMutation.mutate(data);
    },
  });

  const t = useTranslations();

  return (
    <>
      <Head>
        <title> {t('registration')}</title>
      </Head>
      <div className='mb-16 h-full flex items-center justify-center'>
        <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
          <h1 className='text-h-m-d font-bold mb-4'>{t('registration')}</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='space-y-3 mb-14'>
              <InputMaterial
                error={t(formik.errors.email as any)}
                name='email'
                label={t('email')!}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <InputMaterial
                type='password'
                name='password'
                label={t('password')!}
                error={t(formik.errors.password as any)}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <InputMaterial
                error={t(formik.errors.passwordConfirmation as any)}
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                name='passwordConfirmation'
                type='password'
                label={t('repeat_password')!}
              />
            </div>
            <ButtonPrimary
              icon='arrow'
              type='submit'
              busy={signUpMutation.isLoading}
              className='text-left w-full'
              kind='M'
            >
              {t('register')!}
            </ButtonPrimary>
          </form>
        </div>
      </div>
      <div className='flex justify-center flex-col items-center'>
        <span className='text-secondary text-m font-bodyLight'>
          {t('aready_have_account')}
        </span>
        <Link href='/registration' className='text-m text-accent1 mt-3'>
          {t('sign_in')}
        </Link>
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

export default RegistrationPage;
