
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
  authors: string;
}

export interface ProfileData {
  name: string;
  title: string;
  profileImage: string;
  shortBio: string;
  longBio: string;
  skills: string[];
  email: string;
  phone: string;
  location: string;
  projects: Project[];
  socials: SocialLink[];
  experience: Experience[];
  education: Education[];
  publications: Publication[];
}

export enum CursorType {
  DEFAULT = 'DEFAULT',
  HOVER = 'HOVER',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON'
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
