import { InputComponent } from './../../commons/input/input.component';
import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IInfo } from '@app/components/base-layout/base-layout.interface';
import { TextareaComponent } from '@app/components/commons/textarea/textarea.component';
import { LinkPipe } from '@app/shared/pipes/link.pipe';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    PhonePipe,
    LinkPipe,
    NgIf,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
  ],
})
export class PersonalDataComponent {
  @Input() infoFormGroup!: FormGroup<IInfo<FormControl>>;

  public hideNumber: boolean = true;

  public get contactList(): {
    label: string;
    placeholder: string;
    formControlName: keyof IInfo;
    usePipe?: boolean;
    onAction?: () => void;
  }[] {
    return [
      {
        label: 'tel.',
        placeholder: 'PERSONAL_DATA.PLACEHOLDERS.PHONE',
        formControlName: 'phone',
        usePipe: true,
        onAction: () => this.showPhoneNumber(),
      },
      {
        label: 'email:',
        placeholder: 'PERSONAL_DATA.PLACEHOLDERS.EMAIL',
        formControlName: 'email',
        onAction: () => this.openMail(),
      },
      {
        label: 'github:',
        placeholder: 'PERSONAL_DATA.PLACEHOLDERS.GITHUB',
        formControlName: 'github',
        onAction: () => this.openGithub(),
      },
      {
        label: 'linkedIn:',
        placeholder: 'PERSONAL_DATA.PLACEHOLDERS.LINKED_IN',
        formControlName: 'linkedIn',
        onAction: () => this.openLinkedIn(),
      },
      {
        label: '',
        placeholder: 'PERSONAL_DATA.PLACEHOLDERS.CITY',
        formControlName: 'city',
      },
    ];
  }

  public openGithub(): void {
    window.open(this.infoFormGroup.value.github, '_blank');
  }

  public openLinkedIn(): void {
    window.open(this.infoFormGroup.value.linkedIn, '_blank');
  }

  public openMail(): void {
    window.open('mailto:izabelawlazlo9@gmail.com');
  }

  public showPhoneNumber(): void {
    this.hideNumber = !this.hideNumber;
  }
}
