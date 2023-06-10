import { User } from 'api/types';

export const formatFullName = (user?: User) => {
  if (user)
    return `${user.first_name || ''} ${
      user.last_name ? ` ${user.last_name}` : ''
    }`;
  return '';
};
