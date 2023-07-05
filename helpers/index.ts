import { User } from 'api/types';

export enum ProjectPhases {
  idetation = 'Ideation',
  implementation = 'Implementation',
  launch = 'Launch & Execution',
  performance = 'Perfomance & Control',
  closed = 'Project Closed',
}

export enum ProjectHelpTypes {
  financing = 'Financing',
  expertise = 'Expertise',
  resources = 'Resources',
}

export const formatFullName = (user?: User) => {
  if (user)
    return `${user.first_name || ''} ${
      user.last_name ? ` ${user.last_name}` : ''
    }`;
  return '';
};
