
export interface IInfo {
  person: string;
  avatar?: string;
  phone: string;
  email: string;
  linkedIn: string;
  github: string;
}

export type InfoKeys = keyof IInfo;