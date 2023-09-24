import { Component } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  getStyle(hex: string): void {
    document.documentElement.style.setProperty('--text-color', hex);
    document.documentElement.style.setProperty('--panel-color', `${hex}10`);
  }

  chipsOptions = [
    {
      name: 'primary',
      color: '#594557',
      selected: true,
    },
    {
      name: 'accent',
      color: '#214a36',
      selected: false,
    },
    {
      name: 'warn',
      color: '#590524',
      selected: false,
    },
  ];
}
