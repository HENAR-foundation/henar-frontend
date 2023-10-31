import { User } from 'api/types';

export enum ProjectPhases {
    ideation = 'ideation',
    implementation = 'implementation',
    launch = 'launch',
    closed = 'closed',
}

export enum ProjectHelpTypes {
    financing = 'financing',
    expertise = 'expertise',
    resources = 'resources',
}

export const formatFullName = (user?: User) => {
    if (user)
        return `${user.first_name || ''} ${user.last_name ? ` ${user.last_name}` : ''
            }`;
    return '';
};
