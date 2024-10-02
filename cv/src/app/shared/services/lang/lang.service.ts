import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangType } from './lang.interface';
import { SessionStorageKeys } from '@app/shared/enums/variables';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  readonly #translateService = inject(TranslateService);

  #selectedLang: LangType | undefined = undefined;

  public setDefaultLang(): void {
    this.#translateService.addLangs(['en', 'pl'] as LangType[]);
    this.#translateService.setDefaultLang(this.lang);
  }

  public changeLang(): void {
    this.#selectedLang = this.oppositeTranslation;
    this.#translateService.setDefaultLang(this.#selectedLang);

    try {
      sessionStorage?.setItem(SessionStorageKeys.LANG, this.#selectedLang);
    } catch (e) {}
  }

  get lang(): LangType {
    try {
      return (sessionStorage?.getItem(SessionStorageKeys.LANG) ??
        'pl') as LangType;
    } catch (e) {
      return this.#selectedLang ?? 'pl';
    }
  }

  get oppositeTranslation(): LangType {
    return this.lang === 'en' ? 'pl' : 'en';
  }
}
