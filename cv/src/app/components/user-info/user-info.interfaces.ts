
export interface IInfo {
  person: string;
  avatar?: string;
  phone: string;
  email: string;
  linkedIn: string;
}

export type InfoKeys = keyof IInfo;