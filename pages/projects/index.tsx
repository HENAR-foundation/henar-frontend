import { useMutation, useQuery } from '@tanstack/react-query';
import { getProjects } from 'api/projects';
import ButtonPrimary from 'components/ButtonPrimary';
import CreateProjectModal from 'components/CreateProjectModal';
import InputMaterial from 'components/InputMaterial';
import ProjectCard from 'components/ProjectCard';
import SelectMaterial from 'components/SelectMaterial';
import SortingSelect from 'components/SortingSelect';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { useToggle } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { checkSignIn } from 'api/user';
import { ProjectHelpTypes, ProjectPhases } from 'helpers';
import { deleteProject } from 'api/mutations/projects';
import Tabs from 'components/Tabs';

const ProjectsPage = () => {
    const { push } = useRouter();
    const [tab, setTab] = useState("approved")
    const [modalVisible, toggleModal] = useToggle();

    const { data: user } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });

    const [filters, setFilters] = useState<{
        help?: string;
        phase?: string;
        search: string;
        sortType: 'popularity' | 'views' | 'field';
    }>({
        help: undefined,
        phase: undefined,
        search: '',
        sortType: 'popularity',
    });

    const { data: projects } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
    });


    const t = useTranslations();

    const filteredProjects = projects?.filter(({ title, description, how_to_help_the_project, phase }) => {
        return (
            (title.en.toLowerCase().includes(filters.search.toLowerCase()) ||
                description.en.toLowerCase().includes(filters.search.toLowerCase())) &&
            ((!!filters.phase ? phase === filters.phase : true) &&
                (!!filters.help ? how_to_help_the_project === filters.help : true))
        );
    });

    const handleCreateProjectClick = () => {
        if (user) toggleModal();
        else push('/registration');
    };

    return (
        <>
            <Head>
                <title> {t('projects')}</title>
            </Head>
            {modalVisible && <CreateProjectModal onClose={toggleModal} />}
            <div className='flex flex-col lg:flex-row bg-white rounded-xl mt-16 mb-16'>
                <div className='lg:hidden flex-1 flex justify-end'>
                    <Image
                        src='/projects-clock-mobile.svg'
                        width={276}
                        height={277}
                        alt=''
                    />
                </div>
                <div className='lg:my-8 lg:mb-8 mb-7 mx-4 lg:mx-10 flex flex-col flex-1'>
                    <h1 className='lg:mb-4 mb-3 text-h-xl-m font-bold'>
                        {t('projects')}
                    </h1>
                    <span className='font-bodyLight text-m mb-8 leading-6'>
                        {t("projects_desc")}
                    </span>
                    <ButtonPrimary
                        onClick={handleCreateProjectClick}
                        className='lg:w-[205px]'
                        kind='M'
                    >
                        {t('create_project')}
                    </ButtonPrimary>
                </div>
                <div className='lg:flex flex-1 hidden'>
                    <Image src='/projects-clock.svg' width={466} height={245} alt='' />
                </div>
            </div>

            <h1 className='mb-4 text-h-m-d font-bold'>
                {t('projects_plural', { count: user?.role === 'admin' ? filteredProjects?.filter(project => project.moderation_status === tab).length : filteredProjects?.length || 0 })}
            </h1>
            {filteredProjects && filteredProjects?.length === 0 && (
                <span className='text-secondary text-m'>
                    {t('no_projects_published')}
                </span>
            )}
            {user?.role != "admin" && projects && projects?.length !== 0 && (
                <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
                    <span className='min-w-full lg:min-w-[368px]'>
                        <InputMaterial
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    search: e.target.value as any,
                                }))
                            }
                            icon='search'
                            placeholder={t('find_project')}
                        />
                    </span>
                    <SelectMaterial
                        name='phase'
                        onChange={(_name, phase) => {
                            setFilters((prev) => ({
                                ...prev,
                                phase,
                            }));
                        }}
                        options={(
                            Object.keys(ProjectPhases) as (keyof typeof ProjectPhases)[]
                        ).map((val) => ({
                            label: ProjectPhases[val],
                            val,
                        }))}
                        defaultVal='Все стадии'
                        label={t('project_phase')}
                    />
                    <SelectMaterial
                        options={(
                            Object.keys(ProjectHelpTypes) as (keyof typeof ProjectHelpTypes)[]
                        ).map((val) => ({
                            label: ProjectHelpTypes[val],
                            val,
                        }))}
                        name='help'
                        onChange={(_name, help) => {
                            setFilters((prev) => ({
                                ...prev,
                                help,
                            }));
                        }}
                        defaultVal='Все виды'
                        label={t('help_project')}
                    />
                </div>
            )}
            {
                user?.role === "admin" ? (
                    <div>
                        <Tabs className='mt-8 mb-5' options={[{ label: t("projects_approved"), value: "approved" }, { label: t("projects_declined"), value: "rejected" }, { label: t("projects_need_to_approve"), value: "pending" },]} onTabChange={(tab) => setTab(tab)} current={tab} />
                        {
                            tab === 'pending' && <>
                                <h1 className='mb-4 text-h-m-d font-bold'>{t("projects_need_to_approve")} ({filteredProjects?.filter(project => project.moderation_status === "pending").length})</h1>
                                <div className='columns-1 lg:columns-3 space-y-4 mb-10'>
                                    {filteredProjects?.filter(project => project.moderation_status === "pending").length && filteredProjects?.filter(project => project.moderation_status === "pending").length > 0
                                        ? filteredProjects?.filter(project => project.moderation_status === "pending").map((project) => (
                                            <ProjectCard data={project} image='proj_bg.png' />
                                        ))
                                        : <span className='text-secondary text-m'>
                                            {t('no_projects_published')}
                                        </span>
                                    }
                                </div>
                            </>
                        }
                        {
                            tab === 'approved' && <>
                                <h1 className='mb-4 text-h-m-d font-bold'>{t("projects_approved")} ({filteredProjects?.filter(project => project.moderation_status === "approved").length})</h1>
                                <div className='columns-1 lg:columns-3 space-y-4 mb-10'>
                                    {filteredProjects?.filter(project => project.moderation_status === "approved").length && filteredProjects?.filter(project => project.moderation_status === "approved").length > 0
                                        ? filteredProjects?.filter(project => project.moderation_status === "approved").map((project) => (
                                            <ProjectCard data={project} image='proj_bg.png' />
                                        ))
                                        : <span className='text-secondary text-m'>
                                            {t('no_projects_published')}
                                        </span>
                                    }
                                </div>
                            </>
                        }
                        {
                            tab === 'rejected' && <>
                                <h1 className='mb-4 text-h-m-d font-bold'>{t("projects_declined")} ({filteredProjects?.filter(project => project.moderation_status === "rejected").length})</h1>
                                <div className='columns-1 lg:columns-3 space-y-4 mb-10'>
                                    {filteredProjects?.filter(project => project.moderation_status === "rejected").length && filteredProjects?.filter(project => project.moderation_status === "rejected").length > 0
                                        ? filteredProjects?.filter(project => project.moderation_status === "rejected").map((project) => (
                                            <ProjectCard data={project} image='proj_bg.png' />
                                        ))
                                        : <span className='text-secondary text-m'>
                                            {t('no_projects_published')}
                                        </span>
                                    }
                                </div>
                            </>
                        }
                    </div>
                ) : (
                    <div className='columns-1 lg:columns-3 space-y-4 mb-10'>
                        {filteredProjects?.map((project) => (
                            <ProjectCard data={project} image='proj_bg.png' />
                        ))}
                    </div>
                )
            }
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            messages: {
                ...(await import(`../../messages/${locale}.json`)).default,
                ...(await import(`../../messages/formErrors/${locale}.json`)).default,
            },
        },
    };
};

export default ProjectsPage;
