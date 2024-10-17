import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() personalInfo!: IInfo;

  public get contactList(): {
    label: string;
    value: string;
    usePipe?: boolean;
    onAction: () => void;
  }[] {
    const { phone, email, github, linkedIn } = this.personalInfo;

    return [
      {
        label: 'tel.',
        value: phone,
        usePipe: true,
        onAction: () => this.showPhoneNumber(),
      },
      { label: 'email:', value: email, onAction: () => this.openMail() },
      { label: 'github:', value: github, onAction: () => this.openGithub() },
      {
        label: 'linkedIn:',
        value: linkedIn,
        onAction: () => this.openLinkedIn(),
      },
    ];
  }

  public hideNumber: boolean = true;

  public openGithub(): void {
    window.open(this.personalInfo.github, '_blank');
  }

  public openLinkedIn(): void {
    window.open(this.personalInfo.linkedIn, '_blank');
  }

  public openMail(): void {
    window.open('mailto:izabelawlazlo9@gmail.com');
  }

  public showPhoneNumber(): void {
    this.hideNumber = !this.hideNumber;
  }
}
