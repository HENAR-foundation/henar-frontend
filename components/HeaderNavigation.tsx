import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonOutline from './ButtonOutline';
import { useRouter } from 'next/router';
import { useToggle } from 'usehooks-ts';
import AvatarCircle from './AvatarCircle';
import ProfileModal from './ProfileModal';
import LangToggle from './LangToggle';
import { useTranslations } from 'next-intl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { checkSignIn } from 'api/user';
import { signOut } from 'api/mutations/auth';

const links = [
  {
    link: '/projects',
    label: 'projects',
  },
  {
    link: '/specialists',
    label: 'experts',
  },
  {
    link: '/events',
    label: 'events',
  },
  {
    link: '/researches',
    label: 'analytics',
  },
];

const notificationsMock = [
  {
    name: 'Александр Александров',
    avatar: '/fish-person.png',
    id: '1',
  },
  {
    name: 'Александр Александров',
    avatar: '/fish-person.png',
    id: '1',
  },
  {
    name: 'Александр Александров',
    avatar: '/fish-person.png',
    id: '1',
  },
  {
    name: 'Александр Александров',
    avatar: '/fish-person.png',
    id: '1',
  },
];

const NavNotifications: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className='flex flex-col bg-white rounded-b-l pt-[18px] pl-5 pr-[17px] w-[383px] absolute bottom-[-365px] left-[-335px] pb-10 border-t-[1px] border-accent2'>
      <div className='flex justify-between'>
        <span className='text-l'>Уведомления</span>
        <span className='text-accent1 cursor-pointer' onClick={onClose}>
          Закрыть
        </span>
      </div>
      <div className='flex flex-col mt-4'>
        {/* {notificationsMock.map(({ avatar, id, name }, index) => (
          <div className='flex' key={index}>
            <div
              className={`flex items-center h-[60px] ${
                index !== notificationsMock.length - 1
                  ? 'border-b-[1px] border-borderPrimary'
                  : ''
              }`}
              key={index}
            >
              <Image
                src={avatar}
                width={32}
                height={32}
                alt='avatar'
                className='rounded-full h-[32px]'
              />
              <span className='ml-[9px] text-a-ss'>
                <span className='text-accent1'>Александр Алексаднров</span>{' '}
                подтвердил обмен контактамии
              </span>
            </div>
            <div className='flex ml-[13px] w-[13px] justify-center items-center'>
              <Image
                className='cursor-pointer'
                src='/cross-grey.svg'
                width={10}
                height={10}
                alt='delete notification'
              />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

const ProfileNav: FC<{ onShowSettings: () => void }> = ({ onShowSettings }) => {
  const [opened, toggleOpen] = useToggle();
  const [notificationsOpened, toggleNotifications] = useToggle();
  const t = useTranslations();
  const { refetch } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['isSignedIn'],
  });
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    signOut()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['isSignedIn'] });
        refetch();
      })
      .catch((e) => console.info(e, 'FAILED'));
  };

  return (
    <div className='flex relative'>
      <Image
        src='/bell-green.svg'
        width={20}
        height={20}
        className='mr-[14px] cursor-pointer'
        alt='open notifications'
        onClick={toggleNotifications}
      />
      {notificationsOpened && (
        <NavNotifications onClose={toggleNotifications} />
      )}

      <AvatarCircle />
      <div
        className='flex cursor-pointer items-center justify-center'
        onClick={toggleOpen}
      >
        <span className='mx-[10px] text-a-ss leading-[140%]'>John Doe</span>
        <Image
          className={`transform ${opened && 'rotate-180'}`}
          src='/angle-down-grey.svg'
          width={20}
          height={20}
          alt='open tab'
        />
      </div>
      {opened && (
        <div className='border-t-[1px] border-[#D3C1AF] bottom-[-90px] bg-white rounded-b-l flex absolute flex-col pl-[18px] py-[11px] min-w-[132px] space-y-[9px]'>
          <span
            onClick={() => {
              onShowSettings();
              toggleOpen();
            }}
            className='text-a-ss leading-[140%] cursor-pointer'
          >
            {t('settings')}
          </span>
          <span
            onClick={handleSignOut}
            className='text-a-ss leading-[140%] text-error cursor-pointer'
          >
            Выйти
          </span>
        </div>
      )}
    </div>
  );
};

export const HeaderNavigation = () => {
  const t = useTranslations();

  const { push, route } = useRouter();
  const [showSettings, toggleSettings] = useToggle();

  const { data } = useQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });

  return (
    <header className='sticky z-50 top-0 w-full bg-white h-20 justify-center shadow-l lg:flex hidden'>
      <div className='h-full max-w-[1067px] w-full flex items-center justify-between'>
        <section className='flex h-full items-center'>
          <Link href='/'>
            <Image alt='Logo' src='/logo.svg' width={140} height={35} />
          </Link>
          <div className='ml-7 flex items-center space-x-9 text-primary h-full'>
            {links.map((item, index) => (
              <div
                key={index}
                className={`h-full items-center flex ${
                  route === item.link &&
                  'text-accent1 border-b-[2px] border-solid border-accent1'
                }`}
              >
                <Link href={item.link}>{t(item.label as any)}</Link>
              </div>
            ))}
          </div>
        </section>
        <div className='flex items-center'>
          <LangToggle />
          <section className='flex'>
            {data ? (
              <ProfileNav onShowSettings={toggleSettings} />
            ) : (
              <>
                <ButtonPrimary
                  onClick={() => push('/registration')}
                  className='min-w-[138px]'
                >
                  {t('registration')}
                </ButtonPrimary>
                <Link href='/login'>
                  <ButtonOutline className='ml-2 min-w-[137px]'>
                    {t('sign_in')}
                  </ButtonOutline>
                </Link>
              </>
            )}
          </section>
        </div>
      </div>
      {showSettings && <ProfileModal onClose={toggleSettings} />}
    </header>
  );
};

export const HeaderNavigationM = () => {
  const { route } = useRouter();
  const [opened, toggleOpen] = useToggle(false);

  useEffect(() => {
    opened && toggleOpen();
  }, [route]);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened]);

  const t = useTranslations();

  return (
    <header className='sticky top-0 w-full bg-white h-[55px] shadow-l lg:hidden px-5 z-50'>
      {opened && (
        <div className='flex flex-col fixed h-full w-full bg-white z-50 left-0 top-0  justify-between overflow-auto'>
          <div>
            <div className='relative flex h-[55px] mx-5'>
              <div className='absolute w-full h-full flex items-center justify-center'>
                <Image
                  onClick={toggleOpen}
                  src='/mobile_logo.svg'
                  width={84}
                  height={35}
                  alt='logo'
                />
              </div>
              <Image
                src='/cross-black.svg'
                className='z-30'
                width={16}
                height={10}
                alt='burger icon'
                onClick={toggleOpen}
              />
            </div>
            <div className='flex flex-1 flex-col mt-[74px] items-center space-y-11'>
              {links.map(({ link, label }) => (
                <div
                  className={`items-center flex text-xl ${
                    route === link &&
                    'text-accent1 border-b-[2px] border-solid border-accent1'
                  }`}
                >
                  <Link href={link}>{t(label as any)}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col mt-5 mx-[31px]'>
            <ButtonPrimary kind='M'>{t('registration')}</ButtonPrimary>
            <Link href='/login'>
              <ButtonOutline kind='M' className='mt-3 mb-[33px]'>
                {t('sign_in')}
              </ButtonOutline>
            </Link>
            <span className='text-accent1 text-xl leading-[140%] text-center'>
              +7 800 555 35 35
            </span>
            <span className='font-bodyLight text-s text-secondary text-center '>
              Ответим на любой вопрос
            </span>
            <div className='flex justify-center mb-[40px] mt-6'>
              <LangToggle />
            </div>
          </div>
        </div>
      )}
      <div className='relative flex h-full '>
        <div className='absolute w-full h-full flex items-center justify-center'>
          <Image src='/mobile_logo.svg' width={84} height={35} alt='logo' />
        </div>
        <Image
          src='/burger.svg'
          className='z-30'
          width={16}
          height={10}
          alt='burger icon'
          onClick={toggleOpen}
        />
      </div>
    </header>
  );
};
