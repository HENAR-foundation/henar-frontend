import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateUser } from 'api/mutations/user';
import { checkSignIn } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';
import InputMaterial from 'components/InputMaterial';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { getLocationSuggest } from 'api/locationSuggets';
import { createLocation } from 'api/mutations/location';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { LocationSuggestsData } from 'api/types';
import LocationInput from './LocationInput';
import Link from 'next/link';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('err_missing_fields'),
  lastName: Yup.string().required('err_missing_fields'),
  location: Yup.string().required('err_missing_fields'),
  job: Yup.string().required('err_missing_fields'),
});

const AboutModal = () => {
  const t = useTranslations();
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });
  const queryClient = useQueryClient();

  const [suggestsVisible, toggleVisibility] = useState(false);
  const [selectedSuggest, selectSuggest] = useState<{
    data: LocationSuggestsData;
    value: string;
  } | null>(null);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isSignedIn'] }).then(() => {
        PubSub.publish('notification', t("alert_signup_success"));
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      location: '0000000000000',
      locationCode: '',
      job: '',
      phone: '',
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: async ({ job, name, lastName, locationCode, phone }) => {
      if (user) {
        const updatedUser = { ...user };
        if (user.location !== locationCode) {
          const { data, value } = selectedSuggest || {};
          await createLocMutation.mutate(
            {
              city: data?.city || '',
              country: data?.country || '',
              extra_info: '',
              house: data?.house,
              region: data?.region || '',
              settlement: data?.settlement || '',
              street: data?.street || '',
              value: value || '',
            },
            {
              onSuccess: (result) => {
                updatedUser.location = result.data._id;
                updateUserMutation.mutate({
                  ...updatedUser,
                  job,
                  contacts: {
                    ...updatedUser.contacts,
                    phone
                  },
                  first_name: name,
                  last_name: lastName,
                });
              },
            }
          );
        } else {
          updateUserMutation.mutate({
            ...updatedUser,
            job,
            contacts: {
              ...updatedUser.contacts,
              phone
            },
            first_name: name,
            last_name: lastName,
          });
        }
      }
    },
  });

  const createLocMutation = useMutation({ mutationFn: createLocation });

  useEffect(() => {
    toggleVisibility(false);
  }, [formik.values.locationCode]);

  const { data: locSuggests } = useQuery({
    queryFn: () => {
      return getLocationSuggest(formik.values.location, 'ru');
    },
    queryKey: ['locSuggest', formik.values.location],
  });

  const handleSuggestSelect = (index: number) => {
    const { data, value } = locSuggests?.suggestions[index] || {};
    if (data) {
      selectSuggest({ data, value: value || '' });
    }
    formik.setFieldValue('location', value);
    toggleVisibility(false);
  };

  return (
    <>
      <Head>
        <title>Enter additional data</title>
      </Head>
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
                error={t(formik.errors.name as any)}
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder={t('name')}
              />
              <InputMaterial
                name='lastName'
                error={t(formik.errors.lastName as any)}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder={t('last_name')}
              />
            </div>
          </div>
          <div className='mt-7 lg:mt-10 flex justify-between flex-col lg:space-y-0 space-y-3'>
            <div className='flex w-full lg:justify-between lg:items-center lg:flex-row flex-col relative'>
              <span>{t('where_are_you_from')}</span>
              <span className='lg:w-[295px]'>
                <LocationInput
                  name='location'
                  onChange={({ data, value }) => {
                    selectSuggest({ data, value });
                    formik.setFieldValue('location', value);
                  }}
                  error={t(formik.errors.location as any)}
                  locationId={user?.location}
                />
              </span>
              {suggestsVisible &&
                locSuggests &&
                locSuggests?.suggestions.length !== 0 && (
                  <div className='flex flex-col absolute bottom-[-179px] h-[180px] right-0 overflow-auto bg-white z-10 w-[295px] border-t-[1px] border-accent2'>
                    {locSuggests.suggestions.map(({ value }, index) => (
                      <span
                        onClick={() => handleSuggestSelect(index)}
                        className='cursor-pointer font-thin text-m py-[10px] px-3'
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                )}
            </div>
            <div className='flex space-y-3 w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
              <span>{t('phone')}?</span>
              <InputMaterial
                name='phone'
                error={t(formik.errors.phone as any)}
                onChange={formik.handleChange}
                className='lg:w-[295px]'
                placeholder={t('phone')}
              />
            </div>
            <div className='flex space-y-3 w-full lg:justify-between lg:items-center lg:flex-row flex-col'>
              <span>{t('your_occupation')}?</span>
              <InputMaterial
                name='job'
                error={t(formik.errors.job as any)}
                onChange={formik.handleChange}
                className='lg:w-[295px]'
                placeholder={t('current_position')}
              />
            </div>
          </div>
          <div className='flex justify-between mt-11 items-center'>
            <Link href="/HENAR_Privacy-Policy_eng.pdf">
                <span className='font-bodyLight hidden lg:inline-block text-tetriary max-w-[205px] text-a-ss leading-4'>
                {t('agree_policy')}
                </span>
            </Link>
            <ButtonPrimary
              type='submit'
              busy={updateUserMutation.isLoading}
              icon='arrow'
              className='lg:w-[170px] w-full text-left'
              kind='M'
            >
              {t('save')}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </>
  );
};

export default AboutModal;
