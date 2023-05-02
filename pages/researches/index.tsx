import InputMaterial from 'components/InputMaterial';
import StatisticCard from 'components/StatisticCard';

import SelectMaterial from 'components/SelectMaterial';
import Head from 'next/head';
import React from 'react';
import ResearchCard from 'components/ResearchCard';
import ButtonOutline from 'components/ButtonOutline';
import SortingSelect from 'components/SortingSelect';

const ResearchesPage = () => {
  return (
    <>
      <Head>
        <title>Исследования</title>
      </Head>
      <div className='pt-[104px]'>
        <h1 className='mb-4 text-h-xl-m font-bold'>Аналитика</h1>
        <span className='mt-4 font-bodyLight text-xl'>
          Состояние медицины Армении в цифрах и база исследований
        </span>
        <h2 className='mt-[60px] text-h-m-d font-bold'>
          Статистика за 2022 год
        </h2>
        <div className='grid gap-x-6 gap-y-4 grid-cols-1 lg:grid-cols-4 mt-8'>
          {Array(8)
            .fill('')
            .map(() => (
              <StatisticCard
                title='Смертей в ДТП, 2022 год'
                number={12143}
                rate={-1222}
                trendIsPositive
              />
            ))}
        </div>
        <h2 className='mt-[70px] text-h-m-d font-bold'>Исследования</h2>
        <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
          <span className='min-w-full lg:min-w-[368px]'>
            <InputMaterial icon='search' placeholder='Найти исследование' />
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
              { label: 'По популярности', val: 'rus' },
              { label: 'По откликам', val: 'rus' },
              { label: 'По сферам', val: 'us' },
            ]}
          />
        </div>
        <div className='columns-1 lg:columns-3 space-y-4'>
          {Array(11)
            .fill('')
            .map(() => (
              <ResearchCard />
            ))}
        </div>
      </div>
    </>
  );
};

export default ResearchesPage;
