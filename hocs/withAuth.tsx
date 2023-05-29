import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    // // Login data added to props via redux-store (or use react context for example)
    // const { data: user } = useQuery({queryKey: ['user', 'atmta@mail.com'], () =>
    // getUserByEmail('test@test.test'})
    // );
    
    const router = useRouter();
    // If user is not logged in, return login component
    if (false) {
      router.push('/login');
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
