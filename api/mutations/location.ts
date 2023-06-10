import { BackendLocation, LocationSuggestsData } from 'api/types';
import axios from '../axios';
import { AxiosResponse } from 'axios';

export const createLocation = async (loc: {
  value: string;
  country: string;
  region: string;
  city: string;
  settlement: string;
  street: string;
  house: string;
  extra_info: string;
}) => {
  try {
    const result: AxiosResponse<BackendLocation> = await axios.post(
      '/locations',
      { ...loc },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (error: any) {
    throw error.response;
  }
};
