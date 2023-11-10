import axios from '../axios';

export const createStatistics = async (stat: any) => {
    try {
        const result = await axios.post(
            '/statistics',
            {
                ...stat,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateStatistics = async (stat: {
    title: string,
    value: number,
    source: string,
    category: string
}, id: string) => {
    try {
        const result = await axios.patch(
            '/statistics/' + id,
            {
                ...stat,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};


export const deleteStatistics = async (id: string) => {
    try {
        const result = await axios.delete(
            '/statistics/' + id,
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};


