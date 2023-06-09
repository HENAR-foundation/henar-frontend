import Image from 'next/image';
import React, { ButtonHTMLAttributes, FC } from 'react';
import ButtonBase from './ButtonBase';

const Sizes = {
  M: 'p-[14px]',
  default: 'px-[12px] py-[9px]',
} as const;

const Icons = {
  arrow: 'angle-right',
} as const;

const Colors = {
  inverted: 'bg-white text-accent1',
  default: 'bg-accent1 hover:bg-accent1Hover text-white',
  cream: 'bg-accent2 text-black',
};

const BusySpinner = () => (
  <svg
    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      stroke-width='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
);

const ButtonPrimary: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: keyof typeof Sizes;
    color?: keyof typeof Colors;
    icon?: keyof typeof Icons;
    busy?: boolean;
    inverted?: boolean;
  }
> = ({ className, color, busy = false, kind, children, icon, ...rest }) => {
  const pd = Sizes[kind || 'default'];
  const colors = Colors[color || 'default'];
  return (
    <ButtonBase
      className={`${icon ? 'text-left' : 'text-center'} ${
        busy ? 'cursor-wait' : 'pointer'
      } flex justify-between font-medium disabled:bg-opacity-50 disabled:bg-accent1 disabled:text-white disabled:cursor-not-allowed rounded-l text-a-ss ${pd} ${colors} ${className}`}
      {...rest}
    >
      <span className='flex-1'>{children}</span>
      {busy && <BusySpinner />}
      {icon && !busy && (
        <Image
          width={20}
          height={20}
          alt=''
          src={`/${Icons[icon]}${
            color === 'inverted' ? '-green' : '-white'
          }.svg`}
        />
      )}
    </ButtonBase>
  );
};

export default ButtonPrimary;
