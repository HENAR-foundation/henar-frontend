import axios from './axios';
import { Event } from './types';

export const getEvents = async (): Promise<Event[]> => {
    const { data } = await axios.get('/events');
    return data;
  };

  
export const getEvent = async (id: string): Promise<Event> => {
    const { data } = await axios.get('/events/' + id);
    return data;
};
  