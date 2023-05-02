import Image from 'next/image';
import React, { FC } from 'react';

const AvatarCircle: FC<{ src?: string }> = ({ src }) => {
  return (
    <span
      className={`relative overflow-hidden ${src ? 'rounded-xl' : ''} ${src ? 'w-8 h-8' : 'w-9 h-9'}`}
    >
      <Image
        alt='project avatar'
        src={`/${src || 'default-avatar.svg'}`}
        fill
        style={{ objectFit: 'cover' }}
      />
    </span>
  );
};

export default AvatarCircle;
