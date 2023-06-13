import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { useToggle } from 'usehooks-ts';
import Image from 'next/image';

const Notification = () => {
  const [visibleFade, toggleVisibleFade] = useToggle();
  const [visible, toggleVisible] = useToggle(false);
  const [notificationMessage, setMessage] = useState('');
  const handleNotification = (_message: string, data: string) => {
    toggleVisible();
    toggleVisibleFade();
    setMessage(data);
    setTimeout(() => {
      toggleVisibleFade();
      setMessage('');
    }, 5000);
    setTimeout(toggleVisible, 5310);
  };
  useEffect(() => {
    PubSub.subscribe('notification', handleNotification);

    return () => {
      PubSub.unsubscribe('notification');
    };
  }, []);

  return (
    (visible && (
      <div
        className={`w-full lg:w-[700px] left-0 lg:left-[calc(50%-350px)] duration-300 ease-in z-[999] flex fixed top-[100px] text-m text-white py-[22px] pr-7  bg-primary rounded-xl ${
          visibleFade ? 'opacity-1' : 'opacity-0'
        }`}
      >
        <Image
          className='ml-7 mr-3'
          src='/check-circle-green.svg'
          width={20}
          height={20}
          alt=''
        />
        {notificationMessage}
      </div>
    )) ||
    null
  );
};

export default Notification;
