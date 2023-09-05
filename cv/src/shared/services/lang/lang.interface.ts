export interface ILangs {
  pl: ILang;
  en: ILang;
}

export interface ILang {
  lang: LangType;
  button: 'PL' | 'ENG';
}

export type LangType = 'pl' | 'en'
