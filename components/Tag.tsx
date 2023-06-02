import React, { FC } from 'react';

const Colors = {
  grey: 'bg-bgPrimary',
  default: 'bg-accent2 bg-opacity-20',
} as const;

const Tag: FC<{ name: string; color?: keyof typeof Colors }> = ({
  name,
  color,
}) => {
  return (
    <div
      className={` inline-block text-a-ss rounded-ss text-[#927656] cursor-pointer font-bodyLight ${
        Colors[color || 'default']
      }`}
    >
      <span className='mx-2.5 lg:mx-3 my-1 select-none text-s'>{name}</span>
    </div>
  );
};

export default Tag;
