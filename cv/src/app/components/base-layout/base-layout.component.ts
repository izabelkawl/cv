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
import {
  IPersonalInformation,
  IPersonalInformationForm,
} from './base-layout.interface';
import { BaseLayoutService } from './base-layout.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  form: FormGroup<IPersonalInformationForm> = new FormGroup({
    info: new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      position: new FormControl(null),
      avatar: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      linkedIn: new FormControl(null),
      description: new FormControl(null),
    }),
    experience: new FormControl(null),
    education: new FormControl(null),
    specializations: new FormControl(null),
    otherSkills: new FormControl(null),
    clause: new FormControl(null),
  });

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
    this.form.updateValueAndValidity();
    console.log(this.form.value);
    
    // this.#pdfService.generatePdf(this.form.value as any, this.languageState);
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
        name: this.#langService.oppositeTranslation.toUpperCase(),
        basicColor: true,
      },
    ];
  }

  public get personalInfo(): Observable<IPersonalInformation> {
    const { lang } = this.#langService;

    return this.#baseLayoutService.getInfo(lang).pipe(
      untilDestroyed(this),
      take(1),
      map((response: IPersonalInformation) => {
        this.form.patchValue(response);
        this.#data = response;

        return response;
      }),
    );
  }
}
