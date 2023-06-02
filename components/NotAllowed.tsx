import React, { FC } from 'react';

const NotAllowed: FC<any> = ({ children }) => {
    const handleClick = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        return false;
    }
    return (
        <div className='cursor-not-allowed z-10' onClick={handleClick}>
            {children}
        </div>
    );
};

export default NotAllowed;