import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-exploding-star',
  standalone: true,
  templateUrl: './exploding-star.svg',
})
export class ExplodingStarComponent {
  @Input() color: string = StarColor.WHITE;

  @Input() size?: string;
}
