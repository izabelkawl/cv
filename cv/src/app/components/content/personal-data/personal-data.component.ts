import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IInfo, InfoKeys } from '@app/base-layout/base-layout.interface';
import { changeLanguage } from '@app/shared/animations/animations';
import { PhonePipe } from '@app/shared/pipes/phone.pipe';
import { LangType } from '@app/shared/services/lang/lang.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  animations: [changeLanguage],
  standalone: true,
  imports: [TranslateModule, PhonePipe, NgIf, NgFor, UpperCasePipe],
})
export class PersonalDataComponent {
  @Input() languageState: LangType = 'pl';

  @Input() info!: IInfo;

  public hideNumber: boolean = true;

  public get infoData(): InfoKeys[] {
    return ['phone', 'email', 'linkedIn'];
  }

  public onClickInfo(type: InfoKeys): void {
    switch (type) {
      case 'linkedIn':
        window.open('https://www.linkedin.com/in/izabelawl/', '_blank');
        break;
      case 'email':
        window.open('mailto:izabelawlazlo9@gmail.com');
        break;
      case 'phone':
        this.hideNumber = !this.hideNumber;
        break;
      default:
        break;
    }
  }
}
