import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-star',
  standalone: true,
  templateUrl: './star.svg',
})
export class StarComponent {
  @Input() color: string = StarColor.BLUE;
  
  @Input() size?: string;
}
