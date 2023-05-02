import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const BreadCrumbs: FC<{ crumbs: { label: string; link: string }[] }> = ({
  crumbs,
}) => {
  return (
    <div className='flex text-[#9D9D9D] font-bodyLight'>
      {crumbs.map(({ label, link }, index) => (
        <>
          <Link href={link}>{label}</Link>
          {index < crumbs.length - 1 && (
            <Image
              className='mt-[2px]'
              src='/angle-right.svg'
              width={20}
              height={20}
              alt=''
            />
          )}
        </>
      ))}
    </div>
  );
};

export default BreadCrumbs;
