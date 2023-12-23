import { AfterViewInit, Component, Input } from '@angular/core';
import { IInfo, InfoKeys } from './user-info.interfaces';
import { pulseAnimation, rubberBandAnimation } from 'angular-animations';
import { changeLanguage } from 'src/shared/animations/animations';
import { LangType } from 'src/shared/services/lang/lang.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [pulseAnimation(), rubberBandAnimation(), changeLanguage],
})
export class UserInfoComponent implements AfterViewInit {
  @Input() languageState: LangType = 'pl';

  @Input() info!: IInfo;

  pulse = true;

  hideNumber = true;

  ngAfterViewInit(): void {
    this.pulse = !this.pulse;
  }

  get infoData(): InfoKeys[] {
    const keys = Object.keys(this.info) as InfoKeys[];
    return keys.slice(2, keys.length);
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
      case 'github':
        window.open('https://github.com/izabelkawl?tab=repositories', '_blank');
        break;
      default:
        break;
    }
  }
}
