import { Component, OnInit } from '@angular/core';
import { IPersonalInformation, SectionTypes } from './main.interface';
import { MainService } from './main.service';
import { Observable, map } from 'rxjs';
import { PdfService } from 'src/shared/services/pdf/pdf-generator.service';
import { LangService } from 'src/shared/services/lang/lang.service';
import { IButton } from '../commons/buttons/buttons.interfaces';
import {
  flipAnimation,
  rubberBandAnimation,
  pulseAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [flipAnimation(), rubberBandAnimation(), pulseAnimation()],
})
export class MainComponent implements OnInit {
  color = '';

  flipped = false;

  data!: IPersonalInformation;

  buttons: IButton[] = [];

  constructor(
    private mainService: MainService,
    private pdfService: PdfService,
    private langService: LangService
  ) {}

  ngOnInit(): void {
    this.buttons = this.buttonConfig;
    setTimeout(() => {
      this.flipped = !this.flipped;
    }, 0);
  }

  sectionKeys(info: IPersonalInformation): SectionTypes[] {
    return Object.keys(info).slice(1, 4);
  }

  generatePdf(): void {
    this.pdfService.geratePdf({ ...this.data });
  }

  changeLang(): void {
    this.langService.changeLang();
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
        name: this.langService.oppositeTranslation.toUpperCase(),
        type: 'mat-flat-button',
        color: 'primary',
        className: 'ms-2 me-2',
        animate: true,
      },
    ];
  }

  get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.langService;

    return this.mainService.getInfo(lang).pipe(
      map((response: IPersonalInformation) => {
        this.data = response;
        return response;
      })
    );
  }
}
