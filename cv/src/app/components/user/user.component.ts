import { AfterViewInit, Component, Input } from '@angular/core';
import { rubberBandAnimation } from 'angular-animations';
import { IInfo } from 'src/app/main/main.interface';
import { changeLanguage } from 'src/shared/animations/animations';
import { LangType } from 'src/shared/services/lang/lang.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [rubberBandAnimation(), changeLanguage],
})
export class UserComponent implements AfterViewInit {
  @Input() languageState: LangType = 'pl';

  @Input() info!: IInfo;

  rubberBand = true;

  ngAfterViewInit(): void {
    this.rubberBand = !this.rubberBand;
  }
}
