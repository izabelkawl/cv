import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rockets',
  templateUrl: './rockets.component.html',
})
export class RocketsComponent {
  @Input() set level(value: number) {
    if (value >= 0) {
      this.rockets =
        value <= 5
          ? this.rockets.fill(true, 0, value)
          : new Array(5).fill(true);
    }
  }

  rockets: boolean[] = new Array(5).fill(false);
}
