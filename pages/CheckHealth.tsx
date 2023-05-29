import React, { ReactNode } from 'react';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { checkSignIn } from '../api/user';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const CheckHealth: FC<{ children?: ReactNode }> = ({ children }) => {
  //   const { data } = useQuery({ queryKey: ['isSignedIn'], queryFn: checkSignIn });
  //   const { push } = useRouter();
  //   if (data?.status === 200) return <>{children}</>;
  //   push('/login')
  return <>{children}</>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  // prefetch data on the server
  await queryClient.fetchQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });

  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CheckHealth;
