import axios from '../axios';

export const createProject = async (project: {
    description: string;
    title: string;
    whoIsNeeded: string;
    tags: string[];
    tasks: string;
    author: string;
    how_to_help_the_project: string;
    covers: string[];
    links: string;
    request: string;
    phase: string;
}) => {
    const { author, covers, description, title, tasks, whoIsNeeded, tags, links, request, phase, how_to_help_the_project } =
        project;

    try {
        const result = await axios.post(
            '/projects',
            {
                author,
                covers,
                description: { en: description, ru: description, hy: description },
                title: { en: title, ru: title, hy: title },
                objective: { en: tasks, ru: tasks, hy: tasks },
                who_is_needed: { en: whoIsNeeded, ru: whoIsNeeded, hy: whoIsNeeded },
                tags,
                links,
                request,
                phase,
                how_to_help_the_project,
            },
            { withCredentials: true }
        );
        return result;
    } catch (error: any) {
        throw error.response;
    }
};

export const updateProject = async (project: {
    description: string;
    title: string;
    whoIsNeeded: string;
    tags: string[];
    tasks: string;
    author: string;
    how_to_help_the_project: string;
    covers: string[];
    links: string;
    request: string;
    phase: string;
}, id: string) => {
    const { author, covers, description, title, tasks, whoIsNeeded, tags, links, request, phase, how_to_help_the_project } =
        project;
    try {
        const result = await axios.patch(
            '/projects/' + id,
            {
                author,
                covers,
                description: { en: description, ru: description, hy: description },
                title: { en: title, ru: title, hy: title },
                objective: { en: tasks, ru: tasks, hy: tasks },
                who_is_needed: { en: whoIsNeeded, ru: whoIsNeeded, hy: whoIsNeeded },
                tags,
                links,
                request,
                phase,
                how_to_help_the_project,
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
        }); ""
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

export const approveApplicant = ({ projectId, applicantId }: any) => {
    try {
        return axios.post(
            '/projects/applicants/approve',
            {
                projectId,
                applicantId
            },
            { withCredentials: true });
    } catch (error: any) {
        throw error.response;
    }
};

export const rejectApplicant = ({ projectId, applicantId }: any) => {
    try {
        return axios.post(
            '/projects/applicants/reject',
            {
                projectId,
                applicantId
            },
            { withCredentials: true });
    } catch (error: any) {
        throw error.response;
    }
};