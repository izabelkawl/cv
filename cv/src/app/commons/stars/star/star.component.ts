import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-star',
  standalone: true,
  templateUrl: './star.svg',
})
export class StarComponent {
  @Input() config: { color: string; size? : string } = { color: StarColor.WHITE }
}
