import { useRouter } from 'next/router';
import React, { FC } from 'react';
import AvatarCircle from './AvatarCircle';
import FishImage from './FishImage';
import Tag from './Tag';

const ProjectCard: FC<{ image?: string; withShadow?: boolean }> = ({
  image,
  withShadow,
}) => {
  const { push } = useRouter();
  const handleClick = () => {
    push('/projects/1');
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-l overflow-hidden cursor-pointer ${
        withShadow ? 'shadow-sm' : ''
      }`}
      onClick={handleClick}
      role='button'
    >
      {image && (
        <div className='relative aspect-[1.7/1] mb-6'>
          <FishImage />
        </div>
      )}
      <div className='flex p-5 flex-col'>
        <div className='flex justify-between w-full mb-2 text-a-ss text-accent1'>
          <span>125 просмотров</span>
          <span>3 отклика</span>
        </div>
        <span className='mb-3 text-m font-medium'>
          Разработка новой системы анализа медицинских снимков
        </span>
        <div className='inline-flex flex-wrap gap-2 mb-6'>
          <Tag name='Медицина' />
          <Tag name='Медицина' />
        </div>
        <div className='flex items-center space-x-4'>
          <AvatarCircle />
          <div className='flex flex-col'>
            <span className='text-s'>Вячеслав Станиславский</span>
            <span className='text-a-ss font-bodyLight text-secondary'>
              Врач рентгенолог
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
