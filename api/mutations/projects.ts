import axios from '../axios';

export const createProject = async (project: {
  description: string;
  title: string;
  whoIsNeeded: string;
  tags: string[];
  objective: string;
  author: string;
  covers: string[];
}) => {
  const { author, covers, description, title, objective, whoIsNeeded, tags } =
    project;
  try {
    const result = await axios.post(
      '/projects',
      {
        // applicants: [],
        author,
        covers,
        description: { en: description, ru: description, hy: description },
        moderation_status: 'approved',
        title: { en: title, ru: title, hy: title },
        objective: { en: objective, ru: objective, hy: objective },
        who_is_needed: { en: whoIsNeeded, ru: whoIsNeeded, hy: whoIsNeeded },
        tags,
      },
      { withCredentials: true }
    );
    return result;
  } catch (error: any) {
    throw error.response;
  }
};

export const applyForProject = (id: string) => {
  try {
    return axios.get('/projects/respond/' + id, {
      withCredentials: true,
    });
  } catch (error: any) {
    throw error.response;
  }
};
