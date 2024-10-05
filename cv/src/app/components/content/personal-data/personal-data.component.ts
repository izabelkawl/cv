import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IInfo } from '@app/components/base-layout/base-layout.interface';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  standalone: true,
  imports: [TranslateModule, PhonePipe, NgIf, UpperCasePipe],
})
export class PersonalDataComponent {
  @Input() personalInfo!: IInfo;

  public hideNumber: boolean = true;

  public openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/izabelawl/', '_blank');
  }

  public openMail(): void {
    window.open('mailto:izabelawlazlo9@gmail.com');
  }

  public showPhoneNumber(): void {
    this.hideNumber = !this.hideNumber;
  }
}
