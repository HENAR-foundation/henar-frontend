import axios from './axios';
import { LocationSuggests } from './types';

export const getLocationSuggest = async (
  title?: string,
  language?: string
): Promise<LocationSuggests> => {
  const { data } = await axios.get(
    `/locations/suggestions?q=${title}&language=${language || 'ru'}`
  );
  return data || [];
};
