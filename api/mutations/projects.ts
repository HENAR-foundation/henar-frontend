import axios from '../axios';

export const createProject = async (project: {
  description: string;
  title: string;
  whoIsNeeded: string;
  tags: string[];
  objective: string;
  author: string;
  how_to_help_the_project: string;
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

export const deleteProject = async (id: string) => {
    try {
        return axios.delete(
          '/projects/' + id,
          { withCredentials: true }
        );
      } catch (error: any) {
        throw error.response;
      }
}

export const updateProjectStatus = async (project: any, status: string) => {
    try {
        return axios.patch(
          '/projects/' + project._id,
          { 
            ...project,
            project_status: "ideation",
            moderation_status: status
          },
          { withCredentials: true }
        );
      } catch (error: any) {
        throw error.response;
      }
}

