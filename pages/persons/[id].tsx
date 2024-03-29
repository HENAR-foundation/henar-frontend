import { useMutation, useQuery } from '@tanstack/react-query';
import { getProjects, getUserProjects } from 'api/projects';
import { FullName } from 'api/types';
import { getUser } from 'api/user';
import ButtonPrimary from 'components/ButtonPrimary';
import ProjectCard from 'components/ProjectCard';
import RequestContactInfoModal from 'components/RequestContactInfoModal';
import Tag from 'components/Tag';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useToggle } from 'usehooks-ts';
import { checkSignIn } from 'api/user';
import FishImage from 'components/FishImage';
import { formatFullName } from 'helpers';
import { getLocationById } from 'api/location';
import { addUserToAdmins, banUser, removeUserFromAdmins, unbanUser } from 'api/mutations/user';

const SpecialistPage: FC<{ locale: string }> = ({ locale }) => {
    const router = useRouter();
    const { id } = router.query;
    const [contactModal, toggleModal] = useToggle();

    const { data } = useQuery({ queryFn: getProjects, queryKey: ['projects'] });

    const { data: user, refetch: refetchMe } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });
    const { data: userConfirmedProjects } = useQuery({
        queryFn: () => getUserProjects(id?.toString() || ''),
        queryKey: ['userConfirmedProjects'],
    })

    const { data: expert, refetch: refetchExpert } = useQuery({
        queryFn: () => getUser(id?.toString() || ''),
        queryKey: ['person', id],
    });

    const { data: preUserLocation } = useQuery({
        queryFn: () => getLocationById(user?.location || ''),
        enabled: true,
        queryKey: ['userLocation', user?.location],
    });

    const mutationBanUser = useMutation({
        mutationFn: (id: string) => banUser(id),
        onSuccess: () => {
            PubSub.publish(
                'notification',
                t("alert_success_ban")
            );
            refetchExpert()
        }
    })
    const mutationUnbanUser = useMutation({
        mutationFn: (id: string) => unbanUser(id),
        onSuccess: () => {
            PubSub.publish(
                'notification',
                t("alert_success_unban")
            );
            refetchExpert()
        }
    })
    const mutationAddUserToAdmins = useMutation({
        mutationFn: (id: string) => addUserToAdmins(id),
        onSuccess: () => {
            PubSub.publish(
                'notification',
                t("alert_success_add_admin")
            );
            refetchExpert()
            refetchMe()
        }
    })
    const mutationRemoveUserFromAdmins = useMutation({
        mutationFn: (id: string) => removeUserFromAdmins(id),
        onSuccess: () => {
            PubSub.publish(
                'notification',
                t("alert_success_remove_admin")
            );
            refetchExpert()
            refetchMe()
        }
    })

    function handleBanUser() {
        mutationBanUser.mutate(id!.toString())
    }
    function handleUnbanUser() {
        mutationUnbanUser.mutate(id!.toString())
    }
    function handleAddUserToAdmins() {
        mutationAddUserToAdmins.mutate(id!.toString())
    }
    function handleRemoveUserFromAdmins() {
        mutationRemoveUserFromAdmins.mutate(id!.toString())
    }

    const isContactAlreadyRequested =
        !!user?.contacts_request?.outgoing_contact_requests[id as any];

    const t = useTranslations();

    const handleRequestInfo = () => {
        if (user) {
            toggleModal();
        } else {
            router.push('/registration');
            PubSub.publish(
                'notification',
                t("alert_contact_request_noauth")
            );
        }
    };

    return (
        <>
            <Head>
                <title>{formatFullName(expert) || t('experts')}</title>
            </Head>
            <div>

                <div className='absolute w-full top-14 left-0 lg:hidden flex aspect-[1.45/1] mb-5'>
                    {expert?.avatar ? (
                        <Image
                            className='max-h-[400px]'
                            alt='avatar'
                            src={expert?.avatar}
                            style={{ objectFit: 'cover' }}
                            fill
                        />
                    ) : (
                        <FishImage />
                    )}
                </div>
                {contactModal && <RequestContactInfoModal onClose={toggleModal} />}
                <div className='flex flex-col'>
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-[20px] my-[60px] z-20 lg:mt-10 mt-[240px]'>
                        <div className='aspect-[1/1] min-h-[325px] relative rounded-xl overflow-hidden lg:inline-block hidden'>
                            {expert?.avatar ? (
                                <Image
                                    alt='avatar'
                                    src={expert.avatar}
                                    className='object-cover'
                                    fill
                                />
                            ) : (
                                <FishImage />
                            )}
                        </div>
                        <div className='flex flex-col bg-white rounded-s py-6 px-5 justify-between'>
                            <div>
                                <h2 className='text-a-xl mb-3'>{formatFullName(expert)}</h2>
                                <p className='font-bodyLight text-a-m'>{expert?.description}</p>
                            </div>
                            {
                                expert?.email ? null :
                                    <ButtonPrimary
                                        disabled={isContactAlreadyRequested}
                                        kind='M'
                                        icon='arrow'
                                        className='lg:mt-0 mt-9 text-left text-m'
                                        onClick={handleRequestInfo}
                                    >
                                        {isContactAlreadyRequested
                                            ? 'Already requested'
                                            : t('request_contacts')}
                                    </ButtonPrimary>
                            }
                        </div>
                        <div className='flex flex-col bg-white rounded-s py-6 px-5 justify-between' style={{ alignSelf: "flex-start" }}>
                            <div>
                                <h2 className='text-a-xl mb-5'>{t('information')}</h2>
                                <p className='flex justify-between'>
                                    <span className='text-tetriary'>{t('country')}</span>
                                    <span>{preUserLocation?.country}</span>
                                </p>
                                <p className='mt-4 flex justify-between'>
                                    <span className='text-tetriary'>{t('specialty')}</span>
                                    <span className='text-right'>{expert?.job}</span>
                                </p>
                                {/* <h3 className='mt-6 text-a-xl mb-4'>{t('interests')}</h3>
                <div className='inline-flex flex-wrap gap-2 lg:mb-8'>
                  <Tag name='Радиология' />
                  <Tag name='Первая помощь' />
                  <Tag name='Радиология' />
                </div> */}
                                {
                                    !expert?.email ? null :
                                        <div className='mt-10'>
                                            <h2 className='text-a-xl mb-5'>Contacts</h2>
                                            <p className='flex justify-between'>
                                                <span className='text-tetriary'>{t('email')}</span>
                                                <span>{expert.email}</span>
                                            </p>
                                            {
                                                Object.keys(expert?.contacts).map((contactKey: string) => <p className='flex justify-between'>
                                                    <span className='text-tetriary'>{t(contactKey as any)}</span>
                                                    <span>{expert?.contacts[contactKey] || "not filled"}</span>
                                                </p>)
                                            }
                                        </div>
                                }
                                {
                                    user?.role === 'admin' && (
                                        <div className='mt-10'>
                                            {
                                                expert?.banned
                                                    ? <ButtonPrimary onClick={handleUnbanUser} className='w-full'>Unban</ButtonPrimary>
                                                    : <ButtonPrimary onClick={handleBanUser} className='w-full'>Ban</ButtonPrimary>
                                            }
                                            {
                                                expert?.role === 'specialist'
                                                    ? <ButtonPrimary onClick={handleAddUserToAdmins} className='w-full mt-2'>Add to admins</ButtonPrimary>
                                                    : <ButtonPrimary onClick={handleRemoveUserFromAdmins} className='w-full mt-2'>Remove from admins</ButtonPrimary>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <h2 className='font-bold text-h-m-d mb-9'>
                        {t('responses_plural', {
                            count: userConfirmedProjects?.length || 0,
                        })}
                    </h2>
                    <div className='w-full grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4 mb-[85px]'>
                        {userConfirmedProjects?.map && userConfirmedProjects?.map((item, index) => (
                            <ProjectCard key={index} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
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
            messages: (await import(`../../messages/${locale}.json`)).default,
            // dehydratedState: dehydrate(queryClient),
        },
    };
};

export default SpecialistPage;
