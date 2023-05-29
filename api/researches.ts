import axios from './axios';
import { Research } from './types';

export const getResearches = async (): Promise<Research[]> => {
  const { data } = await axios.get('/researches');
  return data || [];
};
