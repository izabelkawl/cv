
import { Component, Input } from '@angular/core';
import { IInfo, InfoKeys } from './personal-info.interfaces';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent {
  @Input() info!: IInfo;
  
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
      default:
        break;
    }
  }
}
