import Image from 'next/image';
import React, { FC, InputHTMLAttributes, useState } from 'react';

const Icons = {
  search: 'search.svg',
} as const;

const TextAreaMaterial: FC<
  InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    icon?: keyof typeof Icons;
  }
> = ({ label, type, error, icon, className, ...rest }) => {
  const borderColor = error ? 'border-error' : 'border-borderPrimary';
  return (
    <div className='flex text-black font-bodyLight flex-col'>
      <div className='flex flex-col'>
        <div className='flex'>
          {icon && (
            <Image
              className='mr-4'
              src={Icons[icon]}
              width={17}
              height={17}
              alt={`${icon} icon`}
            />
          )}
          <div
            className={`relative rounded-l border-[1px] border-solid w-full ${borderColor}`}
          >
            {label && (
              <label
                className='mx-3 mt-2 inline-block  text-secondary text-a-s w-fit'
                htmlFor='input'
              >
                {label}
              </label>
            )}
            <textarea
              id='input'
              className={`resize-none px-3 w-full mb-3 bg-transparent  text-m outline-none ${className} ${
                label ? '' : 'mt-3'
              }`}
              {...rest}
            />
          </div>
        </div>
        {error && <span className='text-error text-a-ss'>{error}</span>}
      </div>
    </div>
  );
};

export default TextAreaMaterial;
