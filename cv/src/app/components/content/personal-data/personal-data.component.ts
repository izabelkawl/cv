import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInfo } from '@app/components/base-layout/base-layout.interface';
import { LinkPipe } from '@app/shared/pipes/link.pipe';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { TranslateModule } from '@ngx-translate/core';

type ContactField =
  | 'phone'
  | 'email'
  | 'github'
  | 'linkedIn'
  | 'website'
  | 'city';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, LinkPipe, PhonePipe],
})
export class PersonalDataComponent {
  @Input() personalInfo!: IInfo;
  @Input() isEditing = false;
  @Output() infoChange: EventEmitter<Partial<IInfo>> = new EventEmitter<
    Partial<IInfo>
  >();

  public hideNumber: boolean = true;

  private linkPipeInstance = new LinkPipe();
  private phonePipeInstance = new PhonePipe();

  public onDescriptionChange(value: string): void {
    this.infoChange.emit({ description: value });
  }

  public onContactChange(field: ContactField, value: string): void {
    this.infoChange.emit({ [field]: value });
  }

  public get contactList(): Array<{
    label: string;
    value: any;
    field: ContactField;
    onAction?: () => void;
    isFirstNoLabel?: boolean;
  }> {
    const { phone, email, github, linkedIn, city, website } = this.personalInfo;

    const list: Array<{
      label: string;
      value: any;
      field: ContactField;
      onAction?: () => void;
      isFirstNoLabel?: boolean;
    }> = [
      {
        label: 'tel.',
        value: this.phonePipeInstance.transform(phone, this.hideNumber),
        field: 'phone',
        onAction: () => this.showPhoneNumber(),
      },
      {
        label: 'email:',
        value: this.linkPipeInstance.transform(email),
        field: 'email',
        onAction: () => this.openMail(),
      },
      {
        label: 'github:',
        value: this.linkPipeInstance.transform(github),
        field: 'github',
        onAction: () => this.openGithub(),
      },
      {
        label: 'linkedIn:',
        value: this.linkPipeInstance.transform(linkedIn),
        field: 'linkedIn',
        onAction: () => this.openLinkedIn(),
      },
      {
        label: '',
        value: this.linkPipeInstance.transform(website),
        field: 'website',
        onAction: () => this.openWebsite(),
      },
      {
        label: '',
        value: city,
        field: 'city',
      },
    ];

    const firstNoLabelIndex = list.findIndex((i) => !i.label);
    if (firstNoLabelIndex !== -1) {
      list[firstNoLabelIndex].isFirstNoLabel = true;
    }

    return list;
  }

  public openGithub(): void {
    window.open(this.personalInfo.github, '_blank');
  }

  public openLinkedIn(): void {
    window.open(this.personalInfo.linkedIn, '_blank');
  }

  public openMail(): void {
    window.open('mailto:' + this.personalInfo.email);
  }

  public openWebsite(): void {
    window.open(this.personalInfo.website);
  }

  public showPhoneNumber(): void {
    this.hideNumber = !this.hideNumber;
  }
}
