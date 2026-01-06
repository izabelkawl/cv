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
  imports: [TranslateModule],
  providers: [LinkPipe, PhonePipe],
})
export class PersonalDataComponent {
  @Input() personalInfo!: IInfo;

  public hideNumber: boolean = true;

  constructor(
    private linkPipe: LinkPipe,
    private phonePipe: PhonePipe,
  ) {}

  public get contactList(): {
    label: string;
    value: string;
    onAction?: () => void;
  }[] {
    const { phone, email, github, linkedIn, city, website } = this.personalInfo;

    return [
      {
        label: 'tel.',
        value: this.phonePipe.transform(phone, this.hideNumber),
        onAction: () => this.showPhoneNumber(),
      },
      {
        label: 'email:',
        value: this.linkPipe.transform(email),
        onAction: () => this.openMail(),
      },
      {
        label: 'github:',
        value: this.linkPipe.transform(github),
        onAction: () => this.openGithub(),
      },
      {
        label: 'linkedIn:',
        value: this.linkPipe.transform(linkedIn),
        onAction: () => this.openLinkedIn(),
      },
      {
        label: '',
        value: this.linkPipe.transform(website),
        onAction: () => this.openWebsite(),
      },
      {
        label: '',
        value: city,
      },
    ];
  }

  public openGithub(): void {
    window.open(this.personalInfo.github, '_blank');
  }

  public openLinkedIn(): void {
    window.open(this.personalInfo.linkedIn, '_blank');
  }

  public openMail(): void {
    window.open('mailto:izabelawlazlo9@gmail.com');
  }

  public openWebsite(): void {
    window.open(this.personalInfo.website);
  }

  public showPhoneNumber(): void {
    this.hideNumber = !this.hideNumber;
  }
}
