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

const ButtonPrimary: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: keyof typeof Sizes;
    color?: keyof typeof Colors;
    icon?: keyof typeof Icons;
    inverted?: boolean;
  }
> = ({ className, color, kind, children, icon, ...rest }) => {
  const pd = Sizes[kind || 'default'];
  const colors = Colors[color || 'default'];
  return (
    <ButtonBase
      className={`${
        icon ? 'text-left' : 'text-center'
      } flex justify-between font-medium disabled:bg-opacity-50 disabled:bg-accent1 disabled:text-white disabled:cursor-not-allowed rounded-l text-a-ss ${pd} ${colors} ${className}`}
      {...rest}
    >
      <span className='flex-1'>{children}</span>
      {icon && (
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
