import { useQuery } from '@tanstack/react-query';
import { checkSignIn } from 'api/user';
import AboutModal from './AboutModal';
import React, { FC } from 'react';


const ContactInfoModal: FC<any> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });
  if (isLoading) return null;
  return data && (!data?.first_name || data?.first_name === '') ? (
    <div
      data-overlay='true'
      className='absolute w-full h-full z-[10] left-0 top-0'
    >
      <div className='flex w-full h-full items-start justify-center opacity-1 overflow-auto'>
        <AboutModal />
      </div>
    </div>
  ) : (
    children
  );
};

export default ContactInfoModal;
