import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC } from 'react';
import { useToggle } from 'usehooks-ts';
import CreateStatisticsModal from './CreateStatisticsModal';

const StatisticCard: FC<{
    id: string;
    value: number;
    title: string;
    source: string;
}> = ({ title, value, source, id }) => {
    const [modal, toggleModal] = useToggle()
    const { data: user } = useQuery({
        queryKey: ['isSignedIn'],
    })

    return (
        <>
            {modal && <CreateStatisticsModal onClose={toggleModal} id={id} />}
            <div className='flex bg-white rounded-s overflow-hidden px-5 py-4 flex-col'>
                <div className='flex flex-row justify-between'>
                    <span className='font-bold text-a-ss text-h-s-d'>{value}</span>
                    {(user as any).role == 'admin' && <Image className='mr-1 cursor-pointer' src='/edit.svg' width={15} height={15} alt='' onClick={toggleModal} />}
                </div>
                <span className='font-bodyLight mt-2  text-a-ss '>{title}</span>
                <span className='text-a-ss  text-tetriary mt-4'>{source}</span>
            </div>
        </>
    );
};

export default StatisticCard;
