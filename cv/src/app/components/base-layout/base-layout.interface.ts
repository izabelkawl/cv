import { ISection } from '../content/section/section.interface';

export interface IPersonalInformation {
  info: IInfo;
  experience: ISection[];
  education: ISection[];
  specializations: ISection[];
  clause: string;
  [name: string]: any;
}

export type SectionTypes = keyof IPersonalInformation;

export interface IInfo {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  github: string;
  linkedIn: string;
  city: string;
  description: string;
  website: string;
}

export type InfoKeys = keyof IInfo;

export interface InfoStateInterface {
  isLoading: boolean;
  info: IInfo | undefined;
  error: string | null;
}
