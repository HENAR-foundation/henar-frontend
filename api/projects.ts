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
