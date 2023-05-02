import axios from './axios';

export const getTags = async () => {
  const { data } = await axios.get('/tags');
  return data;
};