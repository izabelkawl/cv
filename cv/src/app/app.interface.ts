export interface IPersonalInformation {
  info: IInfo;
  experience: IExperienceEducation[];
  education: IExperienceEducation[];
  skills: ISkills[];
  [name: string]: any;
}

export interface IInfo {
  person: string;
  avatar?: string;
  phone: string;
  email: string;
  linkedIn: string;
}

export interface IExperienceEducation {
  title: string;
  company: string;
  description: string[];
}

export interface ISkills {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export type SectionTypes = keyof IPersonalInformation;

export type InfoKeys = keyof IInfo;
