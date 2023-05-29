import { useQuery } from '@tanstack/react-query';
import { checkSignIn } from 'api/user';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useToggle } from 'usehooks-ts';
import { HeaderNavigation as HS } from './HeaderNavigation';

const HeaderNavigation: any = () => {
  const t = useTranslations();
  const { push, route } = useRouter();
  const [showSettings, toggleSettings] = useToggle();

  const { data, isLoading } = useQuery({
    queryKey: ['isSignedIn'],
    queryFn: checkSignIn,
  });
  if (isLoading) return null;
  return (
    <header className='sticky z-50 top-0 w-full bg-white h-20 justify-center shadow-l lg:flex hidden'>
      {/* <HS/> */}
    </header>
  );
};

export default HeaderNavigation;
