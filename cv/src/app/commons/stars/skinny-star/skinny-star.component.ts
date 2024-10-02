import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-skinny-star',
  standalone: true,
  templateUrl: './skinny-star.svg',
})
export class SkinnyStarComponent {
  @Input() config: { color: string; size? : string } = { color: StarColor.WHITE }
}
