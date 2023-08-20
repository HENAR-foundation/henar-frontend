import axios from '../axios';

export const createResearch = async (research: any) => {
    try {
        const result = await axios.post(
            '/researches',
            {
                ...research,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateResearch = async (research: any, id: string) => {
    try {
        const result = await axios.patch(
            '/researches/' + id,
            {
                ...research,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const deleteResearch = async (id: string) => {
    try {
        const result = await axios.delete(
            '/researches/' + id,
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};
