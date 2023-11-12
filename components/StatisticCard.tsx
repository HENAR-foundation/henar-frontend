import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useToggle } from 'usehooks-ts';
import CreateStatisticsModal from './CreateStatisticsModal';
import { StatisticItem, StatisticItemTranslation } from 'api/types';



const StatisticCard: FC<{
    stat: StatisticItem;
}> = ({ stat }) => {
    const { _id: id, en, hy, ru, category } = stat
    const router = useRouter()
    const { locale } = router;

    const getTranslation = (translations: Record<string, StatisticItemTranslation>) => {
        const selectedTranslation = translations[locale!] || en;

        const { title, value, source } = selectedTranslation;
        const fallbackTranslation = {
            title: title || en.title,
            value: value || en.value,
            source: source || en.source,
        };

        return fallbackTranslation;
    };

    const translation = getTranslation({ en, hy, ru });

    const [modal, toggleModal] = useToggle()
    const { data: user } = useQuery({
        queryKey: ['isSignedIn'],
    })

    return (
        <>
            {modal && <CreateStatisticsModal onClose={toggleModal} id={id} />}
            <div className='flex bg-white rounded-s overflow-hidden px-5 py-4 flex-col'>
                <div className='flex flex-row justify-between'>
                    <span className='font-bold text-a-ss text-h-s-d'>{translation.value}</span>
                    {(user as any).role == 'admin' && <Image className='mr-1 cursor-pointer' src='/edit.svg' width={15} height={15} alt='' onClick={toggleModal} />}
                </div>
                <span className='font-bodyLight mt-2  text-a-ss '>{translation.title}</span>
                <span className='text-a-ss  text-tetriary mt-4'>{translation.source}</span>
            </div>
        </>
    );
};

export default StatisticCard;
