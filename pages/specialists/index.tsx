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
import { useState } from 'react';


const SpecialistsPage = () => {
    const t = useTranslations();
    const { data } = useQuery({ queryFn: getUsers, queryKey: ['users'] });
    const [filter, setFilter] = useState("")

    const filteredData = data?.filter(user => user.first_name.toLowerCase().includes(filter.toLowerCase()) || user.last_name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <>
            <Head>
                <title>{t('experts')}</title>
            </Head>

            <div className='flex flex-col'>
                <h1 className='mb-2 text-h-xl-m mt-[59px] font-bold'>{t('experts')}</h1>
                <span className='lg:w-[360px] mb-[54px]'>{t('connect_experts')}</span>
            </div>
            <div className='space-y-5 space-x-0 lg:space-y-0 flex flex-1 flex-col lg:flex-row w-full mb-9 lg:space-x-4 items-end'>
                <span className='min-w-full lg:min-w-[368px]'>
                    <InputMaterial icon='search' placeholder={t('find_an_expert')} onChange={e => setFilter(e.target.value)} />
                </span>
            </div>
            <div className='mb-10 max-w-[1054px] w-full h-full space-y-5'>
                {filteredData?.map((person) => (
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
