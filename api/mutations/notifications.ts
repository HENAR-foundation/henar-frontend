import axios from '../axios';
import { Notification } from '../types';

export const acceptNotifications = async (notificationsIds: string[]) => {
    try {
        const result = await axios.post('/notifications', {
            notificationsIds
        },
        {
            withCredentials: true
        });
        return result
    } catch (error: any) {
        throw error.response
    }
};
