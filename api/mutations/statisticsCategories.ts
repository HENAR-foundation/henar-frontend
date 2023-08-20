import axios from '../axios';

export const createStatisticsCategory = async (cat: {
    title: string;
    steps: string[];
}) => {
    const { title, steps } =
        cat;
    try {
        const result = await axios.post(
            '/statistics-categories',
            {
                title,
                steps
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateStatisticsCategory = async (cat: {
    title: string;
    steps: string[];
}, id: string) => {
    const { title, steps } =
        cat;
    try {
        const result = await axios.patch(
            '/statistics-categories/' + id,
            {
                title,
                steps
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const deleteStatisticsCategory = async (id: string) => {
    try {
        return axios.delete(
            '/statistics-categories/' + id,
            { withCredentials: true }
        );
    } catch (error: any) {
        throw error.response;
    }
}