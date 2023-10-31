import InputMaterial from 'components/InputMaterial';
import StatisticCard from 'components/StatisticCard';
import SelectMaterial from 'components/SelectMaterial';
import Head from 'next/head';
import React, { useState } from 'react';
import ResearchCard from 'components/ResearchCard';
import SortingSelect from 'components/SortingSelect';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { getStatistics } from 'api/statistics';
import { getResearches } from 'api/researches';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import ButtonPrimary from 'components/ButtonPrimary';
import { useToggle } from 'usehooks-ts';
import CreateResearchModal from 'components/CreateResearchModal';
import CreateStatisticsModal from 'components/CreateStatisticsModal';
import Tabs from 'components/Tabs';
import { getStatisticsCategories } from 'api/statisticsCategories';
import { checkSignIn } from 'api/user';

const ResearchesPage = () => {
    const [researchModalVisible, toggleResearchModal] = useToggle()
    const [statisticsModalVisible, toggleStatisticsModal] = useToggle()
    const [category, setCategory] = useState("")

    const { data: user } = useQuery({
        queryFn: checkSignIn,
        queryKey: ['isSignedIn'],
    });

    const { data: stats } = useQuery({
        queryFn: getStatistics,
        queryKey: ['statistics'],
    });

    const { data: categories } = useQuery({
        queryFn: getStatisticsCategories,
        queryKey: ['statisticsCategories'],
        onSuccess: (categories) => {
            categories.length && setCategory(categories[0].id)
        }
    });

    const { data: researches } = useQuery({
        queryFn: getResearches,
        queryKey: ['researches'],
    });

    const [filters, setFilters] = useState<{
        country?: string;
        kind?: string;
        search: string;
        sortType: 'popularity' | 'views' | 'field';
    }>({
        country: undefined,
        kind: undefined,
        search: '',
        sortType: 'popularity',
    });

    const filteredResearches = researches?.filter(({ title }) => {
        return (
            title.toLowerCase().includes(filters.search.toLowerCase())
        );
    });

    const t = useTranslations();

    return (
        <>
            <Head>
                <title>{t('analytics')}</title>
            </Head>
            {researchModalVisible && <CreateResearchModal onClose={toggleResearchModal} />}
            {statisticsModalVisible && <CreateStatisticsModal onClose={toggleStatisticsModal} />}
            <div>
                <div className='flex flex-row justify-between items-center mb-4 mt-14'>
                    <h1 className=' text-h-xl-m font-bold '>{t('analytics')}</h1>
                    {
                        user?.role === 'admin' &&
                        <div className='flex flex-row'>
                            <ButtonPrimary onClick={toggleStatisticsModal} className='mr-4'>{t("new_statistics")}</ButtonPrimary>
                            <ButtonPrimary onClick={toggleResearchModal}>{t("new_research")}</ButtonPrimary>
                        </div>
                    }
                </div>
                <span className='mt-4 font-bodyLight text-xl'>
                    {t('state_medicine')}
                </span>
                <h2 className='mt-[60px] text-h-m-d font-bold'>
                    {t('statistics')}
                </h2>
                <Tabs className='mt-8 mb-5' options={!categories ? [] : categories.map((cat) => ({ label: cat.title, value: cat.id }))} onTabChange={(tab) => setCategory(tab)} current={category} />
                {
                    categories && categories.find(cat => cat.id === category)?.steps.map((step: string, index: number) => <p>{step}</p>)
                }
                <div className='grid gap-x-6 gap-y-4 grid-cols-1 lg:grid-cols-4 mt-8'>
                    {stats?.filter(stat => stat.category === category).map(({ title, value, source, _id }) => (
                        <StatisticCard
                            id={_id}
                            title={title}
                            value={value}
                            source={source}
                        />
                    ))}
                </div>
                <h2 className='mt-[70px] mb-10 text-h-m-d font-bold'>{t('research')}</h2>
                <div className='mb-8'>

                    <InputMaterial
                        onChange={(newVal) =>
                            setFilters((prev) => ({ ...prev, search: newVal.target.value }))
                        }
                        icon='search'
                        placeholder='Найти исследование'
                    />
                </div>
                {/* <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
          <span className='min-w-full lg:min-w-[368px]'>
            <InputMaterial
              onChange={(newVal) =>
                setFilters((prev) => ({ ...prev, search: newVal.target.value }))
              }
              icon='search'
              placeholder='Найти исследование'
            />
          </span>
          <SelectMaterial
            options={[
              { label: 'Россия', val: 'rus' },
              { label: 'Америка', val: 'us' },
            ]}
            icon='globe'
            defaultVal='Все страны'
            label='Страна'
          />
          <SelectMaterial
            options={[
              { label: 'Врач', val: 'rus' },
              { label: 'Стоматолог', val: 'us' },
            ]}
            icon='microscope'
            defaultVal='Все направления'
            label='Направление'
          />
          <SortingSelect
            options={[
              { label: t('by_popularity'), val: 'rus' },
              { label: t('by_response'), val: 'rus' },
              { label: t('by_industry'), val: 'us' },
            ]}
          />
        </div> */}
                <div className='columns-1 lg:columns-3 space-y-4'>
                    {filteredResearches?.map((item, index) => (
                        <ResearchCard key={index} {...item} id={item._id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    //   const queryClient = new QueryClient();

    //   await queryClient.fetchQuery({
    //     queryFn: getStatistics,
    //     queryKey: ['statistics'],
    //   });

    //   await queryClient.fetchQuery({
    //     queryFn: getResearches,
    //     queryKey: ['researches'],
    //   });

    return {
        props: {
            messages: {
                ...(await import(`../../messages/${locale}.json`)).default,
                ...(await import(`../../messages/formErrors/${locale}.json`)).default,
            },
            //   dehydratedState: dehydrate(queryClient),
        },
    };
};

export default ResearchesPage;
