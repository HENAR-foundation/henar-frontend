import axios from "api/axios";

export const createEvent = async (event: {
    description: string;
    title: string;
    cover: string;
    links: string;
    date: Date;
    orgs: string;
}) => {
    const { cover, description, title, links, date, orgs } =
        event;

    try {
        const result = await axios.post(
            '/events',
            {
                // applicants: [],
                title: { en: title, ru: title, hy: title },
                description: { en: description, ru: description, hy: description },
                cover,
                links,
                date: new Date(date).toISOString(),
                orgs,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateEvent = async (event: {
    description: string;
    title: string;
    cover: string;
    links: string;
    date: Date;
    orgs: string;
}, id: string) => {
    const { cover, description, title, links, date, orgs } =
        event;

    try {
        const result = await axios.patch(
            '/events/' + id,
            {
                // applicants: [],
                title: { en: title, ru: title, hy: title },
                description: { en: description, ru: description, hy: description },
                cover,
                links,
                date: new Date(date).toISOString(),
                orgs,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};


export const deleteEvent = async (id: string) => {
    try {
        return axios.delete(
            '/events/' + id,
            { withCredentials: true }
        );
    } catch (error: any) {
        throw error.response;
    }
}
