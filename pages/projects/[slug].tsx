import { useQuery } from '@tanstack/react-query';
import { getProject } from 'api/projects';
import { Translations } from 'api/types';
import { checkSignIn, getUser } from 'api/user';
import ApplyForProjectModal from 'components/ApplyForProjectModal';
import AvatarCircle from 'components/AvatarCircle';
import BreadCrumbs from 'components/BreadCrumbs';
import ButtonPrimary from 'components/ButtonPrimary';
import FishImage from 'components/FishImage';
import { formatFullName } from 'helpers';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useToggle } from 'usehooks-ts';

const ProjectPage: FC<{ locale: string }> = ({ locale, ...rest }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: project } = useQuery({
    queryFn: () => getProject(slug as any),
    queryKey: ['project', slug],
  });

  const { data: user } = useQuery({
    queryFn: () => checkSignIn(),
    queryKey: ['isSignedIn'],
  });

  const { data: createdBy } = useQuery({
    enabled: !!project?.created_by,
    queryFn: () => getUser(project?.created_by || '0'),
    queryKey: ['user', project?.created_by],
  });

  const t = useTranslations();

  const alreadyApplied = !!Object.keys(
    user?.user_projects?.projects_applications || {}
  ).find((key) => key === project?._id);

  const [applyProjectModal, toggleModal] = useToggle();

  const handleApply = () => {
    if (user) {
      toggleModal();
    } else {
      router.push('/registration');
    }
  };

  return (
    <>
      <Head>
        <title>{project?.title[locale as keyof Translations] || ''}</title>
      </Head>
      {applyProjectModal && <ApplyForProjectModal onClose={toggleModal} />}
      <div>
        <div className='absolute w-full top-0 left-0 lg:hidden flex aspect-[1.25/1] mb-5'>
          {project?.covers ? (
            <Image
              fill
              src={project.covers[0]}
              alt='project cover'
              className='object-cover'
            />
          ) : (
            <FishImage />
          )}
        </div>
        <div className='mt-10 hidden lg:flex'>
          <BreadCrumbs
            crumbs={[
              { label: t('projects'), link: '/projects' },
              {
                label: project?.slug || '',
                link: `/projects/${slug}`,
              },
            ]}
          />
        </div>
        <div className='flex flex-col z-20 lg:mt-10 mt-[240px] mb-[140px]'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8 lg:mb-0 mb-4'>
            <div className=' order-2 lg:order-1 lg:col-span-2 space-y-5'>
              <span className='hidden lg:flex aspect-[2/1] relative mb-5 rounded-xl overflow-hidden'>
                {project?.covers ? (
                  <Image
                    fill
                    src={project.covers[0]}
                    alt='project cover'
                    className='object-cover'
                  />
                ) : (
                  <FishImage />
                )}
              </span>
            </div>
            <div className='lg:order-2 col-span-1 space-y-4 lg:space-y-5 z-20'>
              <div className='bg-white rounded-s py-5 px-4 overflow-hidden'>
                <div className='flex items-center space-x-4 mb-6'>
                  <AvatarCircle src='avatar.jpg' />
                  <div className='flex flex-col font-bodyLight'>
                    <span className='text-s'>
                      {formatFullName(createdBy)}
                    </span>
                    <span className='text-a-ss'>{createdBy?.job}</span>
                  </div>
                </div>
                <h2 className='text-l leading-6 mb-3 font-medium'>
                  {project?.title.en}
                </h2>
                <ButtonPrimary
                  kind='M'
                  disabled={alreadyApplied}
                  className='w-full text-left'
                  onClick={handleApply}
                >
                  Apply for project
                </ButtonPrimary>
              </div>
              <div className='col-span-1 mb-4 lg:mb-0'>
                <div className='flex bg-white rounded-s p-6'>
                  <div className='flex flex-col font-bodyLight'>
                    <span className='text-a-m'>
                      {t('responses_plural', {
                        count: project?.successful_applicants?.length || 0,
                      })}
                    </span>
                    <span className='text-tetriary text-a-ss'>
                      {t('views_plural', { count: project?.views || 0 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='z-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-8'>
            <div className='order-2 lg:order-1 lg:col-span-2 space-y-4 lg:space-y-5'>
              <div className='bg-white rounded-s px-6 pt-6 pb-8'>
                <h3 className='text-a-l mb-4'>Описание проекта</h3>
                <span className='font-bodyLight'>
                  {project?.description.en}
                </span>
              </div>
              <div className='bg-white rounded-s px-6 pt-6 pb-8'>
                <h3 className='text-a-l mb-4'>Задачи проекта</h3>
                <span className='font-bodyLight'>{project?.objective.en}</span>
              </div>
              <div className='bg-white rounded-s px-6 pt-6 pb-8'>
                <h3 className='text-a-l mb-4'>{t('project_needs')}</h3>
                <span className='font-bodyLight'>
                  {project?.who_is_needed.en}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale,
}) => {
  //   const { slug } = query;
  //   const queryClient = new QueryClient();

  //   await queryClient.fetchQuery({
  //     queryFn: () => getProject(slug as any),
  //     queryKey: ['project', slug],
  //   });

  return {
    props: {
      locale,
      //   dehydratedState: dehydrate(queryClient),
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
};

export default ProjectPage;
