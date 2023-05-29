import { useQuery } from '@tanstack/react-query';
import { checkSignIn } from 'api/user';

export const useAuth = () => {
  // const currentUser = getUserExplicitly() || null;
  const { data: user } = useQuery({
    queryFn: checkSignIn,
    queryKey: ['signedIn'],
  });
  //   const [user, setUser] = useState<any>(currentUser || null);

  //   useEffect(() => {
  //     globalEventManager.on(
  //       'AUTH_STATE_CHANGE',
  //       (newUser: any) => {
  //         setUser(newUser);
  //       },
  //       true
  //     );
  //   }, []);

  return user;
};
