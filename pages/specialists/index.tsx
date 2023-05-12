import Head from 'next/head';
import withAuth from 'hocs/withAuth';
import SpecialistCard from 'components/SpecialistCard';
import InputMaterial from 'components/InputMaterial';
import SelectMaterial from 'components/SelectMaterial';
import SortingSelect from 'components/SortingSelect';

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
  return (
    <>
      <Head>
        <title>Специалисты</title>
        {/* <meta name='description' content='Generated by create next app' /> */}
      </Head>

      <h1 className='text-h-xl-m mb-9 mt-[59px]'>Специалисты</h1>
      <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
        <span className='min-w-full lg:min-w-[368px]'>
          <InputMaterial icon='search' placeholder='Найти специалиста' />
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
          icon='cap'
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
      <div className='max-w-[1054px] w-full h-full space-y-5'>
        {personsMock.map((person) => (
          <SpecialistCard key={person.description} {...person} />
        ))}
      </div>
    </>
  );
};

export default withAuth(SpecialistsPage);