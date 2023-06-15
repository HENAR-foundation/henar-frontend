import Head from 'next/head';
import withAuth from 'hocs/withAuth';
import SpecialistCard from 'components/SpecialistCard';
import InputMaterial from 'components/InputMaterial';
import SelectMaterial from 'components/SelectMaterial';
import SortingSelect from 'components/SortingSelect';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'api/user';

const personsMock: {
  avatar: string;
  fullName: string;
  description: string;
  location: string;
  job: string;
  tags: string[];
}[] = [
  {
    fullName: 'Иванов Пётр Александрович',
    avatar: 'avatar.jpg',
    description:
      'Кандидат наук, преподаватель кафедры врачебной медицины в НИУ ВШЭ',
    job: 'Врач радиолог',
    location: 'Москва, Россия',
    tags: ['Радиология', 'Первая помощь', 'КТ'],
  },
  {
    fullName: 'Никольский Александр Ильич',
    avatar: 'avatar2.png',
    description:
      'Кандидат наук, преподаватель кафедры врачебной медицины в НИУ ВШЭ',
    job: 'Врач терапевт',
    location: 'Москва, Россия',
    tags: ['Радиология', 'Первая помощь', 'КТ'],
  },
];

const SpecialistsPage = () => {
  const t = useTranslations();
  const { data } = useQuery({ queryFn: getUsers, queryKey: ['users'] });
  return (
    <>
      <Head>
        <title>{t('experts')}</title>
      </Head>

      <div className='flex flex-col'>
        <h1 className='mb-2 text-h-xl-m mt-[59px] font-bold'>{t('experts')}</h1>
        <span className='lg:w-[360px] mb-[54px]'>Раздел для поиска и установления деловых контактов</span>
      </div>
      <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
        <span className='min-w-full lg:min-w-[368px]'>
          <InputMaterial icon='search' placeholder={t('find_an_expert')} />
        </span>
        <SelectMaterial
          options={[
            { label: 'Россия', val: 'rus' },
            { label: 'Америка', val: 'us' },
          ]}
          icon='globe'
          defaultVal='Все страны'
          label={t('country')}
        />
        <SelectMaterial
          options={[
            { label: 'Врач', val: 'rus' },
            { label: 'Стоматолог', val: 'us' },
          ]}
          icon='cap'
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
      <div className='max-w-[1054px] w-full h-full space-y-5'>
        {data?.map((person) => (
          <SpecialistCard key={person.description} {...person} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: {
        ...(await import(`../../messages/${locale}.json`)),
        ...(await import(`../../messages/formErrors/${locale}.json`)),
      },
    },
  };
};

export default withAuth(SpecialistsPage);
