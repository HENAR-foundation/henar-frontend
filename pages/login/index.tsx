import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';
import React from 'react';
import { signIn } from 'api/mutations/auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import {
  QueryClient,
  dehydrate,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { checkSignIn } from 'api/user';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const SigninSchema = Yup.object().shape({
  password: Yup.string().required('Пожалуйста заполните поле'),
  email: Yup.string()
    .email('Не корректный email')
    .required('Пожалуйста заполните поле'),
});

const LoginPage = () => {
  const { push } = useRouter();

  const { data } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['signedIn'],
  });
  
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: ({ email, password }) => {
      signIn(email, password)
        .then((result) => {
          if (result) {
            queryClient
              .invalidateQueries({ queryKey: ['isSignedIn'] })
              .then(() => {
                //   refetch();
                //   push('/projects');
              });
          }
        })
        .catch((e) => console.info(e, 'FAILED'));
    },
  });

  const t = useTranslations();

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
                error={formik.errors.email}
                type='email'
                label='Email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <InputMaterial
                error={formik.errors.password}
                type='password'
                label={t('password')}
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className='mt-5 text-m text-accent1'>Забыли пароль ?</div>
            </div>

            <ButtonPrimary type='submit' icon='arrow' kind='M'>
              {t('sign_in')}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
//   const sessionId = req.cookies['session_id'];

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
};

export default LoginPage;
