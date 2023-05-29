import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useToggle } from 'usehooks-ts';

const Icons = {
  globe: 'globe.svg',
  cap: 'graduation-cap-green.svg',
} as const;

const SortingSelect: FC<{
  icon?: keyof typeof Icons;
  options: { label: string; val: string | number }[];
  onChange?: (newVal: string) => void;
  defaultVal?: string;
}> = ({ defaultVal, onChange, options, icon }) => {
  const handleOptionClick = (e: any) => {
    if (e.currentTarget.dataset['index']) {
      toggleOption(e.currentTarget.dataset['index']);
      onChange &&
        onChange(options[e.currentTarget.dataset['index']].val.toString());
      toggleOpen();
    }
  };

  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        toggleOption(+index);
        toggleOpen();
        break;
      default:
        break;
    }
  };

  const [isOpened, toggleOpen] = useToggle(false);
  const [selectedOption, toggleOption] = useState(defaultVal ? -1 : 0);
  const optionsList = defaultVal
    ? [{ label: defaultVal, val: '' }, ...options]
    : [...options];

  return (
    <div className='w-full flex items-end'>
      {icon && (
        <div className='flex h-[45px] justify-center align-center mr-3'>
          <Image
            src={Icons[icon]}
            width={17}
            height={17}
            alt={`${icon} icon`}
          />
        </div>
      )}
      <div className='flex flex-col w-full'>
        <div className='relative'>
          <button
            id='city'
            defaultValue={''}
            onClick={toggleOpen}
            aria-haspopup='listbox'
            aria-expanded={isOpened}
            className='text-m pl-4 text-left border-solid border-[1px] rounded-l border-accent1 cursor-pointer  text-accent1 bg-no-repeat relative bg-transparent focus:ring-blue-500 focus:border-blue-500 block w-full  py-[11px] text-a-m appearance-none'
          >
            <Image
              className='absolute right-4'
              src='/sort-amount-down.svg'
              width={20}
              height={20}
              alt='sort direction icon'
            />
            {optionsList[selectedOption]?.label || defaultVal}
          </button>
          {isOpened && (
            <ul
              role='listbox'
              aria-activedescendant={optionsList[selectedOption]?.label || ''}
              tabIndex={-1}
              className='z-30 font-bodyLight shadow-l bg-white rounded-l mt-1 w-full px-4 py-2 absolute space-y-5 max-h-[300px] overflow-auto'
            >
              {optionsList.map((option, index) => (
                <li
                  className='cursor-pointer text-m flex justify-between'
                  onKeyDown={handleKeyDown(index)}
                  role='option'
                  aria-selected={selectedOption == index}
                  tabIndex={0}
                  data-index={index}
                  onClick={handleOptionClick}
                >
                  {option.label}
                  {selectedOption == index && (
                    <Image
                      src='/check.svg'
                      width={20}
                      height={20}
                      alt='slected option icon'
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingSelect;
