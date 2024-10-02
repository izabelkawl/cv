import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as app_data from '@assets/app-data/data.json';
import { IPersonalInformation } from './base-layout.interface';
import { LangType } from '@app/shared/services/lang/lang.interface';

@Injectable({
  providedIn: 'root',
})
export class BaseLayoutService {
  public getInfo(lang: LangType): Observable<IPersonalInformation> {
    return of(app_data[lang] as IPersonalInformation);
  }
}
