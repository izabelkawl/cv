import { NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { IInfo } from '@app/components/base-layout/base-layout.interface';
import { rubberBandAnimation } from 'angular-animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [rubberBandAnimation()],
  standalone: true,
  imports: [NgIf, UpperCasePipe],
})
export class UserComponent implements AfterViewInit {
  @Input() info!: IInfo;

  public rubberBand = true;

  ngAfterViewInit(): void {
    this.rubberBand = !this.rubberBand;
  }
}
