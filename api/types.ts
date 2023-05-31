export interface Project {
  _id: string;
  applicants: string[];
  author: string;
  covers: string[];
  description: Translations;
  moderation_status: number;
  objective: Translations;
  reason_of_reject: string;
  rejected_applicants: string[];
  slug: string;
  successful_applicants: string[];
  tags: string[];
  title: Translations;
  views: number;
  who_is_needed: Translations;
}

export interface StatisticItem {
  _id: string;
  count: number;
  translations: Translations;
  year: number;
  year_delta: number;
}

export interface Translations {
  en: string;
  hy: string;
  ru: string;
}

export interface Research {
  _id: string;
  author: string;
  description: Translations;
  link: string;
  moderation_status: number;
  reason_of_reject: string;
  slug: string;
  tags: string[];
  title: Translations;
}

export interface Event {
  _id: string;
  author: string;
  cover: string;
  date: string;
  description: Translations;
  location: string;
  moderation_status: number;
  reason_of_reject: string;
  slug: string;
  tags: string[];
  terms_of_visit: Translations;
  title: Translations;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  avatar: string;
  full_name: FullName;
  description: string;
  contacts: Contacts;
  location: string;
  role: string;
  job: string;
  language: string;
  tags?: string[];
  contacts_request: ContactsRequest;
  user_projects: UserProjects;
}

export interface FullName {
  en: string;
  ru: string;
  hy: string;
}

export interface Contacts {}

export interface ContactsRequest {
  incoming_contact_requests: IncomingContactRequests;
  outgoing_contact_requests: OutgoingContactRequests;
  confirmed_contacts_requests: ConfirmedContactsRequests;
  blocked_users: BlockedUsers;
}

export interface IncomingContactRequests {}

export interface OutgoingContactRequests {}

export interface ConfirmedContactsRequests {}

export interface BlockedUsers {}

export interface UserProjects {
  projects_applications: ProjectsApplications;
  confirmed_applications: ConfirmedApplications;
  rejected_applicants: RejectedApplicants;
  created_projects: CreatedProjects;
}

export interface ProjectsApplications {}

export interface ConfirmedApplications {}

export interface RejectedApplicants {}

export interface CreatedProjects {}
