import Image from 'next/image';
import React, { FC } from 'react';

const StatisticCard: FC<{
  number: number;
  title: string;
  rate: number;
  trendIsPositive: boolean;
}> = ({ title, number, trendIsPositive, rate }) => {
  return (
    <div className='flex bg-white rounded-s overflow-hidden px-5 py-4 flex-col'>
      <span className='font-bodyLight text-tetriary text-a-ss'>{title}</span>
      <div className='flex mt-2 justify-between'>
        <span className='text-h-s-d'>{number}</span>
        <span className='flex text-positive'>
          <Image className='mr-1' src='/triangle-down-green.svg' width={8} height={5} alt='' />{' '}
          {rate}
        </span>
      </div>
    </div>
  );
};

export default StatisticCard;
