import axios from './axios';

export const checkSignIn = async () => {
  const result = await axios.get('/auth/check');
  return result;
};
