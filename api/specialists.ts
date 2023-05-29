import axios from './axios';
import { StatisticItem } from './types';

export const getSpecialists = async (): Promise<StatisticItem[]> => {
  const { data } = await axios.get('/statistics');
  return data || [];
};
