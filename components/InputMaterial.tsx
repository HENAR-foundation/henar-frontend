import Image from 'next/image';
import React, { FC, InputHTMLAttributes, useState } from 'react';

const Icons = {
  search: 'search.svg',
} as const;

const InputMaterial: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    icon?: keyof typeof Icons;
  }
> = ({ label, type, error, icon, className, ...rest }) => {
  const [inputType, toggleType] = useState(type);

  const handleToggleType = () => {
    toggleType((prev) => (prev === 'password' ? 'text' : 'password'));
  };
  const borderColor = error ? 'border-error' : 'border-borderPrimary';
  return (
    <div className='flex text-black font-bodyLight flex-col'>
      {label && (
        <label
          className='inline-block  text-secondary text-a-s w-fit'
          htmlFor='input'
        >
          {label}
        </label>
      )}
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
            className={`relative border-b-[1px] border-solid w-full ${borderColor}`}
          >
            <input
              type={inputType}
              id='input'
              className={`w-full mb-3 bg-transparent  text-m outline-none ${className} ${
                label ? '' : 'mt-3'
              }`}
              {...rest}
            />
            {type === 'password' && (
              <Image
                onClick={handleToggleType}
                className='absolute right-0 top-2 cursor-pointer'
                alt='toggle password visibility'
                width={17}
                height={14}
                src='/eye.svg'
              />
            )}
          </div>
        </div>
        {error && <span className='text-error text-a-ss'>{error}</span>}
      </div>
    </div>
  );
};

export default InputMaterial;
