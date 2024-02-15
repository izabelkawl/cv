import { Component, Input } from '@angular/core';
import { IInfo, InfoKeys } from 'src/app/main/main.interface';
import { changeLanguage } from 'src/shared/animations/animations';
import { LangType } from 'src/shared/services/lang/lang.interface';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  animations: [changeLanguage],
})
export class PersonalDataComponent {
  @Input() languageState: LangType = 'pl';

  @Input() info!: IInfo;

  hideNumber = true;

  get infoData(): InfoKeys[] {
    return ['phone', 'email', 'linkedIn'];
  }

  onClickInfo(type: InfoKeys): void {
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
