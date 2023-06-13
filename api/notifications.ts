import axios from './axios';
import { Notification } from './types';

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await axios.get(`/notifications`);
  return data || [];
};
