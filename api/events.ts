import axios from './axios';

export const getEvents = async () => {
  const { data } = await axios.get('/events');
  return data;
};

export const getUserByEmail = async (email: string) => {
  const { data } = await axios.get(`/user?email=${email}`);
  return data;
};
