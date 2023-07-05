import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import AvatarCircle from './AvatarCircle';
import FishImage from './FishImage';
import Tag from './Tag';

const EventCard: FC<{ event: any }> = ({ event }) => {
  const { push } = useRouter();
  const handleClick = () => {
    push('/events/' + event.slug);
  };

  return (
    <div
      className='flex flex-col bg-white rounded-l overflow-hidden cursor-pointer shadow-sm'
      onClick={handleClick}
      role='button'
    >
      {!event.cover ? (
        <div className='relative aspect-[1.44/1]'>
          <FishImage />
        </div>
        ) : (
        <div className='relative aspect-[1.44/1]'>
            <Image
            fill
            src={event.cover}
            alt='event cover'
            className='object-cover'
          />
        </div>
        )}
      <div className='flex p-5 pb-22 flex-col'>
        <span className='text-m text-accent1 mb-2'>{new Date(event.date).toLocaleDateString()}</span>
        <span className='mb-[54px] text-a-m font-medium text-primary text-m'>
          {event.title.en}
        </span>
        <div className='flex items-center space-x-1'>
          {/* <Image src='/map-pin.svg' width={20} height={20} alt='map pin icon' /> */}
          <span className='font-bodyLight text-secondary text-s'>{event.orgs}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
