import { Component, Input } from '@angular/core';
import { StarColor } from '../stars.enums';

@Component({
  selector: 'app-star-with-tail',
  standalone: true,
  imports: [],
  templateUrl: './star-with-tail.svg',
  styleUrl: './star-with-tail.component.scss',
})
export class StarWithTailComponent {
  @Input() color: string = StarColor.BLUE;

  @Input() size?: string;
}
