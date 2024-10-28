import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take, tap } from 'rxjs';
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
  ISection,
} from './base-layout.interface';
import { BaseLayoutService } from './base-layout.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

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
export class BaseLayoutComponent implements OnInit {
  readonly #pdfService = inject(PdfService);
  readonly #langService = inject(LangService);
  readonly #baseLayoutService = inject(BaseLayoutService);

  public buttons: IButton[] = this.buttonConfig;

  public languageState: LangType = this.#langService.lang;

  public formGroup = new FormGroup<IPersonalInformationForm>({
    info: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      position: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      github: new FormControl(''),
      linkedIn: new FormControl(''),
      city: new FormControl(''),
      description: new FormControl(''),
    }),
    experience: new FormArray<FormGroup<ISection<FormControl>>>([]),
    education: new FormArray<FormGroup<ISection<FormControl>>>([]),
    specializations: new FormArray<FormGroup<ISection<FormControl>>>([]),
    clause: new FormControl(''),
  });

  ngOnInit(): void {
    this.#langService.setDefaultLang();
    this.setPersonalInfo();
  }

  private generatePdf(): void {
    this.#pdfService.generatePdf(
      this.formGroup.value as IPersonalInformation,
      this.languageState,
    );
  }

  private changeLang(): void {
    this.#langService.changeLang();
    this.languageState = this.#langService.lang;
    this.setPersonalInfo();
  }

  private setPersonalInfo(): void {
    this.#baseLayoutService
      .getInfo(this.#langService.lang)
      .pipe(
        untilDestroyed(this),
        take(1),
        tap((response: IPersonalInformation) => {
          this.setFormArray(response, 'education');
          this.setFormArray(response, 'experience');
          this.setFormArray(response, 'specializations');
          this.formGroup.patchValue(response);
        }),
      )
      .subscribe();
  }

  private setFormArray(
    data: IPersonalInformation,
    key: keyof IPersonalInformationForm,
  ): void {
    (data[key] as ISection[]).forEach(() => {
      (this.formGroup.get(key) as FormArray)?.push(this.sectionFormGroup);
    });
  }

  private get sectionFormGroup(): FormGroup<ISection<FormControl>> {
    return new FormGroup({
      title: new FormControl(''),
      subTitle: new FormControl(''),
      period: new FormControl(''),
      description: new FormControl(''),
    });
  }

  private get buttonConfig(): IButton[] {
    return [
      {
        name: 'BUTTONS.EDIT_TEMPLATE',
        action: () => {},
      },
      {
        name: 'BUTTONS.DOWNLOAD_CV',
        action: () => this.generatePdf(),
        basicColor: true,
      },
      {
        name: this.#langService.oppositeTranslation.toUpperCase(),
        action: () => this.changeLang(),
      },
    ];
  }
}
