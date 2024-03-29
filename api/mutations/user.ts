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

export const requestUserContact = async (id: string, message: string) => {
    try {
        return axios.post(
            '/users/request-contacts/' + id,
            { message },
            {
                withCredentials: true,
            }
        );
    } catch (error: any) {
        throw error.response;
    }
};

export const approveUserContactRequest = async (id: string) => {
    try {
        return axios.get(
            '/users/approve-contacts-request/' + id,
            {
                withCredentials: true,
            }
        );
    } catch (error: any) {
        throw error.response;
    }
};

export const declineUserContactRequest = async (id: string) => {
    try {
        return axios.get(
            '/users/reject-contacts-request/' + id,
            {
                withCredentials: true,
            }
        );
    } catch (error: any) {
        throw error.response;
    }
};


export const banUser: (id: string) => Promise<string> = async (id) => {
    const { data } = await axios.get('/users/ban/' + id);

    return data
}

export const unbanUser: (id: string) => Promise<string> = async (id) => {
    const { data } = await axios.get('/users/unban/' + id);

    return data
}
export const addUserToAdmins: (id: string) => Promise<string> = async (id) => {
    const { data } = await axios.get('/users/make-admin/' + id);

    return data
}

export const removeUserFromAdmins: (id: string) => Promise<string> = async (id) => {
    const { data } = await axios.get('/users/remove-admin/' + id);

    return data
}
