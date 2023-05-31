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

const ResearchesPage = () => {
//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       lastName: '',
//       location: '',
//       job: '',
//     },
//     validateOnChange: false,
//     onSubmit: () => {},
//   });

  const { data: stats } = useQuery({
    queryFn: getStatistics,
    queryKey: ['statistics'],
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

  const filteredResearches = researches?.filter(({ title, description }) => {
    return (
      title.en.toLowerCase().includes(filters.search.toLowerCase()) ||
      description.en.toLowerCase().includes(filters.search.toLowerCase())
    );
  });

  const t = useTranslations();

  return (
    <>
      <Head>
        <title>{t('analytics')}</title>
      </Head>
      <div className='pt-[59px]'>
        <h1 className='mb-4 text-h-xl-m font-bold'>{t('analytics')}</h1>
        <span className='mt-4 font-bodyLight text-xl'>
          {t('state_medicine')}
        </span>
        <h2 className='mt-[60px] text-h-m-d font-bold'>
          {t('statistics_on_year', { year: 2022 })}
        </h2>
        <div className='grid gap-x-6 gap-y-4 grid-cols-1 lg:grid-cols-4 mt-8'>
          {stats?.map(({ translations, count, year_delta }) => (
            <StatisticCard
              title={translations.en || 'Смертей в ДТП, 2022 год'}
              number={count}
              rate={year_delta}
              trendIsPositive={year_delta < count}
            />
          ))}
        </div>
        <h2 className='mt-[70px] text-h-m-d font-bold'>{t('researches')}</h2>
        <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
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
        </div>
        <div className='columns-1 lg:columns-3 space-y-4'>
          {filteredResearches?.map((item, index) => (
            <ResearchCard key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryFn: getStatistics,
    queryKey: ['statistics'],
  });

  await queryClient.fetchQuery({
    queryFn: getResearches,
    queryKey: ['researches'],
  });

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ResearchesPage;
