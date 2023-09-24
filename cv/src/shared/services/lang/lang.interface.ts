export interface ILangs {
  pl: ILang;
  en: ILang;
}

export interface ILang {
  lang: LangType;
  button: 'PL' | 'EN';
}

export type LangType = 'pl' | 'en'
