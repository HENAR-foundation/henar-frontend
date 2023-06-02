import { useQuery } from '@tanstack/react-query';
import { checkSignIn } from 'api/user';
import { useRouter } from 'next/router';
import AboutModal from './AboutModal';
import React, { FC } from 'react';

const protectedRoutes = ['/events'] as any;

const ContactInfoModal: FC<any> = ({ children }) => {
  const { route } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });
//   if (!protectedRoutes.includes(route)) return children;
  if (isLoading) return null;
  return data && data?.full_name?.en === '' ? (
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
