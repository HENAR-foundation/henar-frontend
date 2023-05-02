import axios from './axios';
import { Project } from './types';

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get('/projects');
  return data || [];
};
