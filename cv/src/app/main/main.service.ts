import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LangType } from 'src/shared/services/lang/lang.interface';
import { IPersonalInformation } from './main.interface';
import * as app_data from '../../assets/app-data/data.json';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  getInfo(lang: LangType): Observable<IPersonalInformation> {
    return of(app_data[lang] as IPersonalInformation);
  }
}
