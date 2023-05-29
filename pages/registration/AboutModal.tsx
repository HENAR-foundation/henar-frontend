import { useQuery, useQueryClient } from '@tanstack/react-query';
import { updateUser } from 'api/mutations/user';
import { User } from 'api/types';
import { checkSignIn } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Пожалуйста заполните поле'),
  lastName: Yup.string().required('Пожалуйста заполните поле'),
  location: Yup.string().required('Пожалуйста заполните поле'),
  job: Yup.string().required('Пожалуйста заполните поле'),
});

const AboutModal = () => {
  const t = useTranslations();
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      location: '',
      job: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: ({ name, lastName }) => {
      if (user) {
        updateUser({
          ...user,
          full_name: { ...user.full_name, en: `${name} ${lastName}` },
        }).then(() => {
          queryClient
            .invalidateQueries({ queryKey: ['isSignedIn'] })
            .then(() => {
              PubSub.publish('notification', 'Профиль успешно обновлен');
            });
        });
      }
    },
  });

  return (
    <div className='shadow-sm flex bg-white rounded-s overflow-hidden mt-[100px] w-full max-w-[584px] pt-12 px-8 pb-8 flex-col'>
      <h1 className='text-h-m-d font-bold mb-4'>{t('tell_us')}</h1>
      <span className='mb-11 font-bodyLight text-m'>
        {t('after_we_can_tell')}
      </span>
      <form className='flex flex-col' onSubmit={formik.handleSubmit}>
        <div className='flex justify-between lg:flex-row flex-col'>
          <span>{t('what_is_your_name')}</span>
          <div className='flex flex-col space-y-3 lg:w-[295px]'>
            <InputMaterial
              name='name'
              error={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('name')}
            />
            <InputMaterial
              name='lastName'
              error={formik.errors.lastName}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder={t('last_name')}
            />
          </div>
        </div>
        <div className='mt-7 lg:mt-10 flex justify-between flex-col lg:space-y-0 space-y-3'>
          <div className='flex w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
            <span>{t('where_are_you_from')}</span>
            <InputMaterial
              name='location'
              error={formik.errors.location}
              onChange={formik.handleChange}
              className='lg:w-[295px]'
              placeholder={t('input_city')}
            />
          </div>
          <div className='flex space-y-3 w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
            <span>{t('your_occupation')}?</span>
            <InputMaterial
              name='job'
              error={formik.errors.job}
              onChange={formik.handleChange}
              className='lg:w-[295px]'
              placeholder={t('current_position')}
            />
          </div>
        </div>
        <div className='flex justify-between mt-11 items-center'>
          <span className='font-bodyLight hidden lg:inline-block text-tetriary max-w-[205px] text-a-ss leading-4'>
            {t('agree_policy')}
          </span>
          <ButtonPrimary
            type='submit'
            icon='arrow'
            className='lg:w-[170px] w-full text-left'
            kind='M'
          >
            {t('save')}
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default AboutModal;
