import Image from 'next/image';
import React, { FC } from 'react';
import ButtonPrimary from './ButtonPrimary';
import { useTranslations } from 'next-intl';
import InputMaterial from './InputMaterial';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextAreaMaterial from './TextAreaMaterial';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestUserContact } from 'api/mutations/user';
import { useRouter } from 'next/router';

const MotivationSchema = Yup.object().shape({
  motivation: Yup.string()
    .min(5, 'Должно содержать минимум 5 символов')
    .max(1500, 'Может содержать максимум 1500 символов')
    .required('err_missing_fields'),
});

const RequestContactInfoModal: FC<{ onClose: VoidFunction }> = ({
  onClose,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const t = useTranslations();
  const queryClient = useQueryClient();

  const requestInfoMutation = useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      requestUserContact(id, message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['person', id] });
      queryClient.refetchQueries({ queryKey: ['person', id] });
      PubSub.publish('notification', 'Реквест успешно отправлен');
      onClose();
    },
  });
  const formik = useFormik({
    initialValues: {
      motivation: '',
    },
    validateOnChange: false,
    validationSchema: MotivationSchema,
    onSubmit: ({ motivation }) => {
      requestInfoMutation.mutate({ id: id as string, message: motivation });
    },
  });
  return (
    <div
      data-overlay='true'
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      className='fixed w-full h-full z-[100] left-0 top-0'
    >
      <div
        data-overlay='true'
        className='flex w-full h-full items-center justify-center opacity-1 overflow-auto'
      >
        <div className='flex-col h-full w-full flex items-center overflow-auto  lg:mt-0 relative'>
          <div className='lg:w-[850px] w-full mt-[100px] min-h-full relative'>
            <Image
              src='/cross-white.svg'
              width={20}
              height={20}
              alt=''
              className='lg:right-[-40px] absolute lg:top-0 top-[-50px] right-[25px] cursor-pointer'
              onClick={onClose}
            />
            <div className='rounded-t-xl overflow-hidden flex lg:flex-row flex-col justify-between  bg-accent1  w-full pb-6 pt-10 lg:px-8 px-4'>
              <div className='text-white flex flex-col'>
                <h3 className='lg:leading-8 leading-7 font-bold text-h-m-m lg:text-h-m-d mb-2'>
                  {t('request_contacts')}
                </h3>
              </div>
              <div className='lg:mt-0 mt-7'>
                <ButtonPrimary
                  onClick={formik.submitForm}
                  className='lg:w-[180px] w-full'
                  kind='M'
                  icon='arrow'
                  color='inverted'
                >
                  Запросить
                </ButtonPrimary>
              </div>
            </div>
            <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col lg:w-[160px]'>
                  <span className='text-l'>Мотивация</span>
                  <span className='font-bodyLight text-a-ss'>
                    Почему хотите запросить контакт специалиста?
                  </span>
                </div>
                <div className='w-full max-w-[480px]'>
                  <TextAreaMaterial
                    className='h-[120px]'
                    name='motivation'
                    error={formik.errors.motivation}
                    onChange={formik.handleChange}
                    value={formik.values.motivation}
                    placeholder='Мотивация'
                  />
                  <span className='text-secondary text-a-ss'>
                    До 1500 символов
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestContactInfoModal;
