import Image from 'next/image';
import React, { FC } from 'react';

export enum Icons {
  locationPoint = '/map-pin.svg',
  graduationCap = '/graduation-cap.svg',
  graduationCapGreen = '/graduation-cap-green.svg',
}

const Icon: FC<{ size?: number; name: Icons }> = ({ name, size = 24 }) => {
  return (
    <div>
      <Image src={name} width={size} height={size} alt='' />
    </div>
  );
};

export default Icon;
