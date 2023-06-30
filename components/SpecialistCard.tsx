import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ButtonOutline from './ButtonOutline';
import FishImage from './FishImage';
import Icon, { Icons } from './Icon';
import Tag from './Tag';
import { useTranslations } from 'next-intl';
import { GetServerSideProps } from 'next';
import { User } from 'api/types';
import { formatFullName } from 'helpers';
import Image from 'next/image';

const SpecialistCard: FC<any> = (user) => {
  const {
    _id,
    avatar,
    // first_name,
    // last_name,
    description,
    location,
    job,
    tags,
  } = user;
  const { push } = useRouter();
  const t = useTranslations();

  const handleRequestContactModal = () => {
    push('/persons/' + _id);
  };
  return (
    <div className={`shadow-l p-4 lg:p-0 w-full h-full rounded-xl  flex min-h-[${user.small ? "100px" : "218px"}] bg-white overflow-hidden lg:flex-row flex-col`} onClick={user.onClick}>
      <div className='flex justify-center items-center'>
        <div className={`lg:m-4 lg:w-[${user.small ? '100px' : '184px'}] w-full relative aspect-[1/1]`}>
          {avatar ? (
            <figure className='relative w-full h-full rounded-s overflow-hidden'>
              <Image
                alt={`${user.first_name} avatar`}
                src={avatar}
                fill
                className='object-cover'
              />
            </figure>
          ) : (
            <FishImage />
          )}
        </div>
      </div>
      <div className='h-full lg:ml-6 pt-6 lg:pt-[21px] flex-col flex items-baseline'>
        <h2 className='text-a-m lg:text-l lg:mb-0 mb-2'>
          {formatFullName(user)}
        </h2>
        <div className='lg:flex mt-2 hidden space-x-7'>
          {job && (
            <span className='flex'>
              <Icon name={Icons.graduationCapGreen} size={20} />
              <span className='text-legacyGraphit text-s ml-2 inline-block '>
                {job}
              </span>
            </span>
          )}
          {location && (
            <span className='flex'>
              <Icon name={Icons.locationPoint} size={20} />
              <span className='text-legacyGraphit text-s ml-2 inline-block '>
                {location}
              </span>
            </span>
          )}
        </div>
        <span className='font-bodyLight text-legacyGraphit text-s inline-block max-w-[355px] mt-4 mb-9'>
          {description}
        </span>
        <div className='flex space-x-1.5  mb-[20px]'>
          {tags?.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </div>
      {
        !user.small &&
        <div className='flex items-start lg:pt-4 lg:justify-end flex-1'>
            <ButtonOutline
            icon='mail'
            onClick={handleRequestContactModal}
            className='lg:w-auto w-full lg:mr-8'
            >
            {t('request_contacts')}
            </ButtonOutline>
        </div>
        }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  // const queryClient = new QueryClient();

  // await queryClient.fetchQuery({
  //   queryKey: ['projects'],
  //   queryFn: getProjects,
  // });

  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SpecialistCard;
