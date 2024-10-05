import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, take } from 'rxjs';
import { changeLanguage } from '@app/shared/animations/animations';
import { PdfService } from '@app/shared/services/pdf/pdf-generator.service';
import { LangService } from '@app/shared/services/lang/lang.service';
import { LangType } from '@app/shared/services/lang/lang.interface';
import { ButtonsComponent } from '@app/components/commons/buttons/buttons.component';
import { IButton } from '@app/components/commons/buttons/buttons.interfaces';
import { ChipsComponent } from '@app/components/commons/chips/chips.component';
import { PersonalDataComponent } from '@app/components/content/personal-data/personal-data.component';
import { SectionComponent } from '@app/components/content/section/section.component';
import { UserComponent } from '@app/components/content/user/user.component';
import { IPersonalInformation } from './base-layout.interface';
import { BaseLayoutService } from './base-layout.service';

@UntilDestroy()
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  animations: [changeLanguage],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgTemplateOutlet,
    ButtonsComponent,
    SectionComponent,
    PersonalDataComponent,
    UserComponent,
    ChipsComponent,
  ],
})
export class BaseLayoutComponent implements OnInit, AfterViewInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #pdfService = inject(PdfService);
  readonly #langService = inject(LangService);
  readonly #baseLayoutService = inject(BaseLayoutService);

  public buttons: IButton[] = [];

  public languageState: LangType = this.#langService.lang;

  #data!: IPersonalInformation;

  ngOnInit(): void {
    this.#langService.setDefaultLang();
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonConfig;
    this.#cdr.detectChanges();
  }

  public onClick(id: string): void {
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

  private generatePdf(): void {
    this.#pdfService.generatePdf({ ...this.#data }, this.languageState);
  }

  private changeLang(): void {
    this.#langService.changeLang();
    this.languageState = this.#langService.lang;
    this.buttons = this.buttonConfig;
  }

  private get buttonConfig(): IButton[] {
    return [
      { id: 'pdf', name: 'PDF' },
      {
        id: 'lang',
        basicColor: true,
        name: this.#langService.oppositeTranslation.toUpperCase(),
      },
    ];
  }

  public get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.#langService;

    return this.#baseLayoutService.getInfo(lang).pipe(
      untilDestroyed(this),
      take(1),
      map((response: IPersonalInformation) => {
        this.#data = response;

        return response;
      }),
    );
  }
}
