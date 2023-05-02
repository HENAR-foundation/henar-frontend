import Image from 'next/image';
import React, { FC, InputHTMLAttributes } from 'react';

const Input: FC<InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({
  className,
  label,
  ...rest
}) => {
  return (
    <div className='font-bodyLight'>
      {label && (
        <label className='inline-block  text-tetriary text-a-s w-fit mb-2.5' htmlFor='input'>
          {label}
        </label>
      )}
      <div className='relative'>
        <span className='absolute w-12 h-full flex items-center'>
          <Image
            className='ml-4'
            src='search.svg'
            width={17}
            height={17}
            alt='search icon'
          />
        </span>
        <input
          id='input'
          className='w-full h-12 rounded-s shadow-l pl-12 outline-none text-tetriary'
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
