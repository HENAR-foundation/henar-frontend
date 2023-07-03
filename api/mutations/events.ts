import axios from "api/axios";

export const createEvent = async (project: {
    description: string;
    title: string;
    cover: string;
    links: string;
    date: Date;
    orgs: string;
  }) => {
    const { cover, description, title, links, date, orgs } =
      project;

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