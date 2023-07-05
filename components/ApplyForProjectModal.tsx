import Image from 'next/image';
import React, { FC } from 'react';
import ButtonPrimary from './ButtonPrimary';
import { useTranslations } from 'next-intl';
import InputMaterial from './InputMaterial';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextAreaMaterial from './TextAreaMaterial';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestUserContact } from 'api/mutations/user';
import { useRouter } from 'next/router';
import ButtonOutline from './ButtonOutline';
import { applyForProject } from 'api/mutations/projects';
import { getProject } from 'api/projects';

const ApplyForProjectModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const router = useRouter();
  const { slug } = router.query;
  const t = useTranslations();
  const queryClient = useQueryClient();

  const { data: project } = useQuery({
    queryFn: () => getProject(slug as any),
    queryKey: ['project', slug],
  });

  const applyMutation = useMutation({
    mutationFn: () => applyForProject(project?._id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', slug] });
      queryClient.refetchQueries({ queryKey: ['project', slug] });
      PubSub.publish('notification', 'Request was sended');
      onClose();
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
                  {t("respond_to_project")}
                </h3>
              </div>
            </div>
            <div className='rounded-b-xl overflow-hidden  space-y-10 flex flex-col bg-white lg:px-8 px-4 py-6'>
              <div className='flex justify-between lg:flex-row flex-col'>
                <div className='flex flex-col w-full'>
                  <span className='text-l'>{t("are_you_sure")}</span>
                  <div className='flex flex-row space-x-5 w-[50%] mt-5 justify-between'>
                    <ButtonPrimary
                      onClick={() => applyMutation.mutate()}
                      kind='M'
                      className='flex-1'
                    >
                  {t("apply")}
                      
                    </ButtonPrimary>
                    <ButtonOutline
                      kind='M'
                      className='flex-1'
                      onClick={onClose}
                    >
                                        {t("cancel")}
                    </ButtonOutline>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForProjectModal;
