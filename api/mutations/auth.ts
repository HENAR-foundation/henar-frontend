import axios from '../axios';

export const signUp = async (email: string, password: string) => {
  const { data } = await axios.post('/auth/signup', { email, password });
  return data;
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await axios.post(
      '/auth/signin',
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return result;
  } catch (error: any) {
    throw error.response;
  }
};
