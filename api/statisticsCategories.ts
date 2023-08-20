import axios from './axios';
import { StatisticItem } from './types';

export const getStatisticsCategories = async (): Promise<any[]> => {
    const { data } = await axios.get('/statistics-categories');
    return data || [];
};

export const getStatisticsCategory = async (id: string): Promise<any> => {
    const { data } = await axios.get('/statistics-categories/' + id);
    return data || null;
};
