import React, { ButtonHTMLAttributes, FC } from 'react';

const ButtonBase: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={
        className +
        ' disabled:bg-disabled disabled:cursor-not-allowed disabled:text-black'
      }
    >
      {children}
    </button>
  );
};

export default ButtonBase;
