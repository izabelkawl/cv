import { Component, Input, OnInit } from '@angular/core';
import { IInfo, InfoKeys } from './user-info.interfaces';
import { pulseAnimation, rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [pulseAnimation(), rubberBandAnimation()],
})
export class UserInfoComponent implements OnInit {
  pulse = true;

  hideNumber = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.pulse = !this.pulse;
    }, 0);
  }

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
      case 'phone':
        this.hideNumber = !this.hideNumber;
        break;
      default:
        break;
    }
  }
}
