import { IExperienceEducation } from "./components/experience-education/experience-education.interface";
import { IInfo } from "./components/personal-info/personal-info.interfaces";
import { ISkills } from "./components/skills/skills.interfaces";

export interface IPersonalInformation {
  info: IInfo;
  experience: IExperienceEducation[];
  education: IExperienceEducation[];
  skills: ISkills[];
  [name: string]: any;
}

export type SectionTypes = keyof IPersonalInformation;
