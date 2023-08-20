import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import Tag from './Tag';
import { Research } from 'api/types';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import CreateResearchModal from './CreateResearchModal';
import { useToggle } from 'usehooks-ts';

const ResearchCard: FC<Research & { id?: string }> = ({ title, source, link, id }) => {
    const [modal, toggleModal] = useToggle()
    const t = useTranslations()
    //   const { push } = useRouter();
    //   const handleClick = () => {
    //     push('/projects/1');
    //   };

    const { data: user } = useQuery({
        queryKey: ['isSignedIn']
    })

    return (
        <>
            {modal && <CreateResearchModal onClose={toggleModal} id={id} />}
            <div className='flex flex-col bg-white rounded-l overflow-hidden'>
                <div className='flex p-5 flex-col'>
                    <div className='flex flex-row justify-between w-full mb-2 text-a-ss text-accent1 font-bodyLight'>
                        <span>{source}</span>
                        {(user as any).role == 'admin' && <Image className='mr-1 cursor-pointer' src='/edit.svg' width={15} height={15} alt='' onClick={toggleModal} />}
                    </div>
                    <span className='mb-3 text-a-m font-medium'>{title}</span>
                    <div className='space-x-1 flex'>
                        <Image src='/external-link-alt.svg' width={16} height={16} alt='' />
                        <Link
                            href={link}
                            target='_blank'
                            className='font-bodyLight text-a-ss'
                        >
                            {t("link")}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResearchCard;
