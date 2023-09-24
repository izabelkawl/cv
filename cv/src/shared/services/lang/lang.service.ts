import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILang, ILangs, LangType } from './lang.interface';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  value: boolean = false;

  langs: ILangs = {
    pl: { lang: 'pl', button: 'EN' },
    en: { lang: 'en', button: 'PL' },
  };

  selectedLang: ILang = this.langs.pl;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'pl'] as LangType[]);
    translate.setDefaultLang('pl' as LangType);
  }

  changeLang(): void {
    const { pl, en } = this.langs;

    this.selectedLang = this.value ? pl : en;
    this.translate.setDefaultLang(this.selectedLang.lang);
    this.value = !this.value;
  }
}
