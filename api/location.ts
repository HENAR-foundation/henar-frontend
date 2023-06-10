import axios from './axios';
import { BackendLocation } from './types';

export const getLocationById = async (
  id: string
): Promise<BackendLocation | null> => {
  const { data } = await axios.get(`/locations/${id}`);
  return data || null;
};
