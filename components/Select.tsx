import React, { FC } from 'react';

const Select: FC<{ label?: string; defaultVal: string }> = ({
  defaultVal,
  label,
}) => {
  return (
    <div className='w-full font-bodyLight'>
      {label && (
        <label
          className='inline-block text-tetriary text-a-s w-fit mb-2.5'
          htmlFor='city'
        >
          {label}
        </label>
      )}
      <select
        id='city'
        defaultValue={''}
        className='cursor-pointer shadow-l text-legacyBlack bg-no-repeat bg-[calc(100%-25px)_50%] relative bg-white rounded-s focus:ring-blue-500 focus:border-blue-500 block w-full pl-[11px]   py-[11px] text-a-m appearance-none bg-arrow-select'
      >
        <option>{defaultVal}</option>
        <option value='US'>United States</option>
        <option value='CA'>Canada</option>
        <option value='FR'>France</option>
        <option value='DE'>Germany</option>
      </select>
    </div>
  );
};

export default Select;
