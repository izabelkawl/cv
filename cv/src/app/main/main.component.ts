import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { IPersonalInformation, SectionTypes } from './main.interface';
import { MainService } from './main.service';
import { Observable, map } from 'rxjs';
import { PdfService } from 'src/shared/services/pdf/pdf-generator.service';
import { LangService } from 'src/shared/services/lang/lang.service';
import { IButton } from '../commons/buttons/buttons.interfaces';
import { changeLanguage } from 'src/shared/animations/animations';
import { LangType } from 'src/shared/services/lang/lang.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [changeLanguage],
})
export class MainComponent implements AfterViewInit {
  color = '';

  data!: IPersonalInformation;

  buttons: IButton[] = [];

  languageState: LangType = this.langService.lang;

  constructor(
    private cdr: ChangeDetectorRef,
    private pdfService: PdfService,
    private langService: LangService,
    private mainService: MainService,
  ) {}

  ngAfterViewInit(): void {
    this.buttons = this.buttonConfig;
    this.cdr.detectChanges();
  }

  sectionKeys(info: IPersonalInformation): SectionTypes[] {
    return Object.keys(info).slice(1, 3);
  }

  generatePdf(): void {
    this.pdfService.geratePdf({ ...this.data });
  }

  changeLang(): void {
    this.langService.changeLang();
    this.languageState = this.langService.lang;
    this.buttons = this.buttonConfig;
  }

  onClick(id: string): void {
    switch (id) {
      case 'pdf':
        this.generatePdf();
        break;
      case 'lang':
        this.changeLang();
        break;
      default:
        break;
    }
  }

  get buttonConfig(): IButton[] {
    return [
      { id: 'pdf', name: 'PDF', type: 'mat-raised-button' },
      {
        id: 'lang',
        basicColor: true,
        name: this.langService.oppositeTranslation.toUpperCase(),
        type: 'mat-raised-button',
        className: 'ms-2 me-2',
        animate: true,
      },
    ];
  }

  get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.langService;

    return this.mainService.getInfo(lang).pipe(
      untilDestroyed(this),
      map((response: IPersonalInformation) => {
        this.data = response;
        return response;
      }),
    );
  }
}
