import axios from '../axios';
import { Notification } from '../types';

export const acceptNotifications = async (notificationIds: string[]) => {
    try {
        const result = await axios.post('/notifications', {
            notificationIds
        },
        {
            withCredentials: true
        });
        return result
    } catch (error: any) {
        throw error.response
    }
};
