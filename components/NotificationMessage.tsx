import React, { FC, useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { useToggle } from 'usehooks-ts';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NotificationContactRequest = (body: any) => {
    const t = useTranslations()
    return (
    <>
        <span className='ml-[9px] text-a-ss'>
            <Link target="_blank" href={"/persons/" + body.personId}>
                <span className='text-accent1'>
                    {body.personFullName}
                </span>{' '}
            </Link>
            {t("notifications_contact_request")}
        </span>
    </>
    )
}

const NotificationContactRequestApprove = (body: any) => {
    const t = useTranslations()
    return (
    <>
        <span className='ml-[9px] text-a-ss'>
            <Link target="_blank" href={"/persons/" + body.personId}>
                <span className='text-accent1'>
                    {body.personFullName}
                </span>{' '}
            </Link>
            {t("notifications_contact_request_approved")}
        </span>
    </>
    )
}

const NotificationProjectRequest = (body: any) => {
    const t = useTranslations()
    return (
    <>
        <span className='ml-[9px] text-a-ss'>
            <Link target="_blank" href={"/persons/" + body.personId}>
                <span className='text-accent1'>
                    {body.personFullName}
                </span>{' '}
            </Link>
            {t("notifications_project_request")}
        </span>
    </>
    )
}

const NotificationProjectRequestApprove = (body: any) => {
    const t = useTranslations()
    return (
    <>
        <span className='ml-[9px] text-a-ss'>
            {t("notifications_project_request_approved")}{' '}
            <Link target="_blank" href={"/projects/" + body.projectId}>
                <span className='text-accent1'>
                    {body.projectTitle}
                </span>
            </Link>
        </span>
    </>
    )
}

function getNotificationByType(type: string, body: any) {
    switch (type) {
        case "project_request": return <NotificationProjectRequest {...body} />
        case "approve_applicant": return <NotificationProjectRequestApprove {...body} />
        case "contact_requested": return <NotificationContactRequest {...body} />
        case "contact_request_approved": return <NotificationContactRequestApprove {...body} />
        default: return null
    }
}

const NotificationMessage: FC<{ notification: any, first: boolean }> = ({ notification, first }) => {
  return (
    <div className='flex' style={{ opacity: notification.status === "new" ? 1 : 0.5 }}>
        <div
        className={`flex items-center h-[60px] ${
            'border-b-[1px] border-borderPrimary'
        }`}
        >
        <Image
            src={notification.body.avatar}
            width={32}
            height={32}
            alt='avatar'
            className='rounded-full h-[32px]'
        />
        {
            getNotificationByType(notification.type, notification.body)
        }
        </div>
    </div>
  );
};

export default NotificationMessage;
