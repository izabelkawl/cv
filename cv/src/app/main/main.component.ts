import { Component } from '@angular/core';
import { IPersonalInformation, SectionTypes } from './main.interface';
import { MainService } from './main.service';
import { Observable, map } from 'rxjs';
import { PdfService } from 'src/shared/services/pdf/pdf-generator.service';
import { LangService } from 'src/shared/services/lang/lang.service';
import {
  ButtonTypes,
  ColorTypes,
  IButton,
} from '../commons/buttons/buttons.interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  data!: IPersonalInformation;

  constructor(
    private translateService: TranslateService,
    private mainService: MainService,
    private pdfService: PdfService,
    private lang: LangService
  ) {}

  sectionKeys(info: IPersonalInformation): SectionTypes[] {
    return Object.keys(info).slice(1, 4);
  }

  generatePdf(): void {
    this.pdfService.geratePdf({ ...this.data });
  }

  changeLang(): void {
    this.lang.changeLang();
  }

  onClick(id: string): void {
    switch (id) {
      case 'pdf':
        this.generatePdf();
        break;
      default:
        this.changeLang();
        break;
    }
  }

  get buttonConfig(): IButton[] {
    return [
      { id: 'pdf', name: 'PDF', type: 'mat-raised-button' },
      {
        id: 'lang',
        name: this.lang.selectedLang.button,
        type: 'mat-flat-button',
        color: 'primary',
        className: 'ms-2 me-2',
      },
    ];
  }

  get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.lang.selectedLang;

    return this.mainService.getInfo(lang).pipe(
      map((response: IPersonalInformation) => {
        this.data = response;
        return response;
      })
    );
  }
}
