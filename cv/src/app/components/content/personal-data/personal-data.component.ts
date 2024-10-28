import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInfo } from '@app/components/base-layout/base-layout.interface';
import { LinkPipe } from '@app/shared/pipes/link.pipe';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  standalone: true,
  imports: [TranslateModule, PhonePipe, LinkPipe, NgIf, UpperCasePipe],
})
export class PersonalDataComponent {
  @Input() infoFormGroup!: FormGroup<IInfo<FormControl>>;

  public hideNumber: boolean = true;

  public get contactList(): {
    label: string;
    value: string | undefined;
    usePipe?: boolean;
    onAction?: () => void;
  }[] {
    const { phone, email, github, linkedIn, city } = this.infoFormGroup.value;

    return [
      {
        label: 'tel.',
        value: phone,
        usePipe: true,
        onAction: () => this.showPhoneNumber(),
      },
      {
        label: 'email:',
        value: email,
        onAction: () => this.openMail(),
      },
      {
        label: 'github:',
        value: github,
        onAction: () => this.openGithub(),
      },
      {
        label: 'linkedIn:',
        value: linkedIn,
        onAction: () => this.openLinkedIn(),
      },
      {
        label: '',
        value: city,
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
