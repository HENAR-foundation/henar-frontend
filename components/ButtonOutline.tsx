import Image from 'next/image';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { useToggle } from 'usehooks-ts';
import ButtonBase from './ButtonBase';

const Sizes = {
  M: 'p-[14px]',
  default: 'px-[12px] py-[9px]',
} as const;

const Icons = {
  mail: 'envelope-question.svg',
} as const;

const ButtonOutline: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    kind?: keyof typeof Sizes;
    icon?: keyof typeof Icons;
  }
> = ({ className, kind, icon, children, ...rest }) => {
  const [hovered, toggleHover] = useToggle(false);
  return (
    <ButtonBase
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      className={`bg-white flex justify-between hover:bg-accent1 hover:text-white border-[1px] text-accent1 border-solid border-accent1 rounded-l text-a-ss ${
        Sizes[kind || 'default']
      } ${icon ? 'text-left' : 'text-center'} ${className}`}
      {...rest}
    >
      <span className='flex-1'>{children}</span>
      {icon && (
        <Image
          className='ml-4'
          width={20}
          height={20}
          alt=''
          src={hovered ? '/white-' + Icons[icon] : `/${Icons[icon]}`}
        />
      )}
    </ButtonBase>
  );
};

export default ButtonOutline;
