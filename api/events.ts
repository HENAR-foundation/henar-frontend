import axios from './axios';
import { Event } from './types';

export const getEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get('/events');
  return data;
};
