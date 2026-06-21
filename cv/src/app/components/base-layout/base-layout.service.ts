import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as app_data from '@assets/app-data/data.json';
import { IPersonalInformation } from './base-layout.interface';
import { LangType } from '@app/shared/services/lang/lang.interface';

@Injectable({
  providedIn: 'root',
})
export class BaseLayoutService {
  #overrideData: Partial<Record<LangType, IPersonalInformation>> = {};

  public setData(data: Record<string, any>): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const plData = data['pl'] as IPersonalInformation | undefined;
    const enData = data['en'] as IPersonalInformation | undefined;

    if (!plData && !enData) {
      return false;
    }

    if (plData) {
      this.#overrideData.pl = plData;
    }
    if (enData) {
      this.#overrideData.en = enData;
    }

    return true;
  }

  public getInfo(lang: LangType): Observable<IPersonalInformation> {
    const source =
      this.#overrideData[lang] ?? (app_data[lang] as IPersonalInformation);
    return of(source);
  }
}
