import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangType } from './lang.interface';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  selectedLang: LangType | undefined = undefined;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'pl'] as LangType[]);
    translate.setDefaultLang(this.lang);
  }

  changeLang(): void {
    this.selectedLang = this.oppositeTranslation;
    this.translate.setDefaultLang(this.selectedLang);

    try {
      sessionStorage?.setItem('lang', this.selectedLang);
    } catch (e) {}
  }

  get lang(): LangType {
    try {
      return (sessionStorage?.getItem('lang') ?? 'pl') as LangType;
    } catch (e) {
      return this.selectedLang ?? 'pl';
    }
  }

  get oppositeTranslation(): LangType {
    return this.lang === 'en' ? 'pl' : 'en';
  }
}
