import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-exploding-star',
  standalone: true,
  templateUrl: './exploding-star.svg',
})
export class ExplodingStarComponent {
  @Input() config: { color: string; size? : string } = { color: StarColor.WHITE }
}
