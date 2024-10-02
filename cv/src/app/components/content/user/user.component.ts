import { NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { IInfo } from '@app/base-layout/base-layout.interface';
import { changeLanguage } from '@app/shared/animations/animations';
import { LangType } from '@app/shared/services/lang/lang.interface';
import { rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [rubberBandAnimation(), changeLanguage],
  standalone: true,
  imports: [NgIf, UpperCasePipe],
})
export class UserComponent implements AfterViewInit {
  @Input() languageState: LangType = 'pl';

  @Input() info!: IInfo;

  public rubberBand = true;

  ngAfterViewInit(): void {
    this.rubberBand = !this.rubberBand;
  }
}
