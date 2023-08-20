import axios from './axios';
import { Research } from './types';

export const getResearches = async (): Promise<Research[]> => {
    const { data } = await axios.get('/researches');
    return data || [];
};

export const getResearch = async (id: string): Promise<Research> => {
    const { data } = await axios.get('/researches/' + id);
    return data || [];
};
