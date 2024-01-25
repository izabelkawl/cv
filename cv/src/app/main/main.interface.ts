import { IExperienceEducation } from '../components/experience-education/experience-education.interface';

export interface IPersonalInformation {
  info: IInfo;
  experience: IExperienceEducation[];
  education: IExperienceEducation[];
  skills: ISkill[];
  [name: string]: any;
}

export type SectionTypes = keyof IPersonalInformation;

export interface ISkill {
  name: string;
}

export interface IInfo {
  firstName: string;
  lastName: string;
  position: string;
  avatar: string;
  phone: string;
  email: string;
  linkedIn: string;
  description: string;
}

export type InfoKeys = keyof IInfo;
