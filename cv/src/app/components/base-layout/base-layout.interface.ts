import { ISection } from '../content/section/section.interface';
import { FormControl, FormGroup } from '@angular/forms';

export interface IPersonalInformation {
  info: IInfo;
  experience: ISection[];
  education: ISection[];
  specializations: ISection[];
  otherSkills: ISection[];
  clause: string;
  [name: string]: any;
}

export interface IPersonalInformationForm {
  info: FormGroup<{
    firstName: FormControl;
    lastName: FormControl;
    position: FormControl;
    avatar: FormControl;
    phone: FormControl;
    email: FormControl;
    linkedIn: FormControl;
    description: FormControl;
  }>;
  experience: FormControl;
  education: FormControl;
  specializations: FormControl;
  otherSkills: FormControl;
  clause: FormControl;
}

export type SectionTypes = keyof IPersonalInformation;

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

export interface InfoStateInterface {
  isLoading: boolean;
  info: IInfo | undefined;
  error: string | null;
}
