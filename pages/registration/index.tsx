import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useToggle } from 'usehooks-ts';
import * as Yup from 'yup';
import AboutModal from './AboutModal';
import { signUp } from 'api/mutations/auth';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .max(50, 'Пароль может содержать максимум 50 символов')
    .required('Пожалуйста заполните поле'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Пароли не совпадают'
  ),
  email: Yup.string()
    .email('Не корректный email')
    .required('Пожалуйста заполните поле'),
});

const RegistrationPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: ({ email, password }) => {
      signUp(email, password);
    },
  });

  const [nextSlide, toggleSlide] = useToggle(false);

  return (
    <>
      <Head>
        <title>Регстрация</title>
      </Head>
      <div className='mb-16 h-full flex items-center justify-center'>
        {nextSlide ? (
          <AboutModal />
        ) : (
          <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-[360px] pt-12 px-8 pb-8 flex-col'>
            <h1 className='text-h-m-d font-bold mb-4'>Регистрация</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className='space-y-3 mb-14'>
                <InputMaterial
                  error={formik.errors.email}
                  type='email'
                  name='email'
                  label='Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <InputMaterial
                  type='password'
                  name='password'
                  label='Пароль'
                  error={formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <InputMaterial
                  error={formik.errors.passwordConfirmation}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  name='passwordConfirmation'
                  type='password'
                  label='Повторите пароль'
                />
              </div>
              <ButtonPrimary
                icon='arrow'
                type='submit'
                // onClick={toggleSlide}
                className='text-left w-full'
                kind='M'
              >
                Зарегистрироваться
              </ButtonPrimary>
            </form>
          </div>
        )}
      </div>
      <div className='flex justify-center flex-col items-center'>
        <span className='text-secondary text-m font-bodyLight'>
          Уже есть аккаунт ?
        </span>
        <Link href='/registration' className='text-m text-accent1 mt-3'>
          Войти
        </Link>
      </div>
    </>
  );
};

export default RegistrationPage;
