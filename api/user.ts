import axios from './axios';
import { User } from './types';

export const checkSignIn: () => Promise<User> = async () => {
    const { data } = await axios.get('/auth/check');

    return data.message ? false : data;
};

export const getUsers: () => Promise<User[]> = async () => {
    const { data } = await axios.get('/users');

    return data;
};

export const getCurrentUsers: (ids: string[]) => Promise<User[]> = async (ids: string[]) => {
    let users: User[] = []

    return Promise.all(ids.map(async (id) => {
        const { data } = await axios.get('/users/' + id);
        return data
    }))

}

export const getUser: (id: string) => Promise<User> = async (id) => {
    const { data } = await axios.get('/users/' + id);

    return data;
};

