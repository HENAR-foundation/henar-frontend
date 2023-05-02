export interface Project {
  _id: string;
  applicants: string[];
  author: string;
  covers: string[];
  description: Description;
  moderation_status: number;
  objective: Objective;
  reason_of_reject: string;
  rejected_applicants: string[];
  slug: string;
  successful_applicants: string[];
  tags: string[];
  title: Title;
  views: number;
  who_is_needed: WhoIsNeeded;
}

export interface Description {
  en: string;
  hy: string;
  ru: string;
}

export interface Objective {
  en: string;
  hy: string;
  ru: string;
}

export interface Title {
  en: string;
  hy: string;
  ru: string;
}

export interface WhoIsNeeded {
  en: string;
  hy: string;
  ru: string;
}
