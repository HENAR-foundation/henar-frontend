import { User } from 'api/types';
import axios from '../axios';

export const updateUser = async (user: User) => {
  try {
    const result = await axios.patch('/users/' + user._id, user, {
      withCredentials: true,
    });
    return result;
  } catch (error: any) {
    throw error.response;
  }
};
