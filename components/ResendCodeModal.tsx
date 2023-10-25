import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ButtonPrimary from 'components/ButtonPrimary';
import { useMutation, useQuery, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import ButtonOutline from 'components/ButtonOutline';

const ResendCodeModal: FC<{
    onClose: VoidFunction, email: string, isLoading: boolean, onClick: UseMutationResult<any, unknown, {
        email: string;
    }, unknown>
}> = ({ onClose, isLoading, email, onClick }) => {
    const queryClient = useQueryClient();

    const t = useTranslations();

    const handleClick = () => onClick.mutate({ email })

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

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
                    <div className=' lg:w-[850px] mt-[100px] min-h-full relative'>
                        <Image
                            src='/cross-white.svg'
                            width={20}
                            height={20}
                            alt=''
                            className='lg:right-[-25px] absolute lg:top-0 top-[-50px] right-[25px] cursor-pointer'
                            onClick={onClose}
                        />

                        <div className=' rounded-l overflow-hidden flex flex-col items-center bg-white  w-full pb-6 pt-10 lg:px-8 px-4'>

                            <h1 className='text-h-m-d my-5 font-bold '>{t('resend_verification_code')}</h1>
                            <div className="flex gap-1" >
                                <span>
                                    {`${t('we_sent_code')}`}
                                </span>
                                <span className="font-bold">
                                    {email}
                                </span>
                            </div>
                            <div className="flex w-full justify-center gap-40 mt-10">
                                <ButtonOutline
                                    onClick={onClose}
                                    className='min-w-[138px]'
                                    // type='submit'
                                    // icon='arrow'
                                    kind='M'
                                >
                                    {t('got_it')}
                                </ButtonOutline>
                                <ButtonPrimary
                                    onClick={handleClick}
                                    busy={isLoading}
                                    className='min-w-[138px]'
                                    color='inverted'
                                    kind='M'>
                                    {t('send_again')}
                                </ButtonPrimary>
                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </div>
    );
};

export default ResendCodeModal;
