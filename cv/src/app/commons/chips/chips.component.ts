import { Component, OnInit } from '@angular/core';
import { IChips } from './chips.interfaces';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
})
export class ChipsComponent implements OnInit {
  ngOnInit(): void {
    try {
      this.setColor();
    } catch (e) {}
  }

  setColor(): void {
    const chipsIndex: string | null = sessionStorage?.getItem('chipsIndex');
    const basicColor: string = getComputedStyle(document.body).getPropertyValue(
      '--basic-color'
    );

    this.chipsOptions.forEach((option, index) => {
      const { selected, color } = option;

      option.selected = chipsIndex ? chipsIndex === index.toString() : !index;

      if (selected) {
        document.documentElement.style.setProperty(
          '--basic-color',
          color ?? basicColor
        );
      }
    });
  }

  toggleSelection(index: number, hex: string): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips) => ({
      ...option,
      selected: false,
    }));
    this.chipsOptions[index].selected = true;

    try {
      sessionStorage?.setItem('chipsIndex', index.toString());
    } catch (e) {}

    document.documentElement.style.setProperty('--basic-color', hex);
  }

  chipsOptions: IChips[] = [
    {
      name: 'primary',
      color: '#594557',
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
