import {
  Component,
} from '@angular/core';
import { IChips } from './chips.interfaces';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {

  toggleSelection(index: number, hex: string): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips) => ({
      ...option,
      selected: false,
    }));
    this.chipsOptions[index].selected = true;

    document.documentElement.style.setProperty('--basic-color', hex);
  }

  chipsOptions: IChips[] = [
    {
      name: 'primary',
      color: '#594557',
      selected: true,
    },
    {
      name: 'accent',
      color: '#214a36',
    },
    {
      name: 'basic',
      color: '#4d4d4d',
    },
  ];
}
