import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable, map } from 'rxjs';
import { IPersonalInformation, SectionTypes } from './app.interface';
import { LangService } from 'src/shared/services/lang/lang.service';
import { PdfService } from 'src/shared/services/pdf/pdf-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data!: IPersonalInformation;

  constructor(
    private appService: AppService,
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

  get buttonName(): string {
    return this.lang.selectedLang.button;
  }

  get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.lang.selectedLang;
    
    return this.appService.getInfo(lang).pipe(
      map((response: IPersonalInformation) => {
        this.data = response;
        return response;
      })
    );
  }
}
