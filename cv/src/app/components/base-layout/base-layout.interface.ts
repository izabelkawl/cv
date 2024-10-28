import { FormGroup, FormControl, FormArray } from '@angular/forms';

export interface IPersonalInformation {
  info: IInfo;
  experience: ISection[];
  education: ISection[];
  specializations: ISection[];
  clause: string;
}

export interface IInfo<T = string> {
  firstName: T;
  lastName: T;
  position: T;
  phone: T;
  email: T;
  github: T;
  linkedIn: T;
  city: T;
  description: T;
}

export interface ISection<T = string> {
  title: T;
  subTitle: T;
  period: T;
  description: T extends string ? string[] : T;
}

export interface IPersonalInformationForm {
  info: FormGroup<IInfo<FormControl>>;
  experience: FormArray<FormGroup<ISection<FormControl>>>;
  education: FormArray<FormGroup<ISection<FormControl>>>;
  specializations: FormArray<FormGroup<ISection<FormControl>>>;
  clause: FormControl;
}
