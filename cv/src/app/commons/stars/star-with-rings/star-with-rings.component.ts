import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-star-with-rings',
  standalone: true,
  templateUrl: './star-with-rings.svg',
})
export class StarWithRingsComponent {
  @Input() color: string = StarColor.BLUE;

  @Input() size?: string;
}
