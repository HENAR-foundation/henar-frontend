import axios from './axios';
import { Project } from './types';

export const getProject = async (slug?: string): Promise<Project> => {
    const { data } = await axios.get(`/projects/${slug}`);
    return data || [];
};

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await axios.get('/projects');
    return data || [];
};

export const getMyProjects = async (): Promise<Project[]> => {
    const { data } = await axios.get('/my-projects');
    return data || [];
};

export const getUserProjects = async (id: string): Promise<Project[]> => {
    const { data } = await axios.get('/projects/user-projects/' + id);

    return data || []
};