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
    throw error;
  }
};

export const signOut = async () => {
  try {
    const result = await axios.get('/auth/signout');
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (secret_code: string) => {
  const { data } = await axios.get(`/auth/verify-email/?secret_code=${secret_code}`);
  return data;
};

export const resendVerificationEmail = async ({ code, email }: { code?: string, email?: string }) => {
  const { data } = await axios.post(`/auth/resend-verification-email/`, {
    ...email && { email },
    ...code && { token: code },
  });
  return data;
};