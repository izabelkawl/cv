import { Component, OnInit } from '@angular/core';
import { IChips } from './chips.interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
})
export class ChipsComponent implements OnInit {
  chipsOptions: IChips[] = [
    {
      name: 'navyBlue',
      color: '#27384c',
      selected: true,
    },
    {
      name: 'green',
      color: '#214a36',
      selected: false,
    },
    {
      name: 'beige',
      color: '#A5A692',
      selected: false,
    },
  ];

  ngOnInit(): void {
    try {
      this.setColor();
    } catch (e) {}
  }

  setColor(): void {
    const chipsIndex: string | null = sessionStorage?.getItem('chipsIndex');
    const basicColor: string = getComputedStyle(document.body).getPropertyValue(
      '--basic-color',
    );
    this.chipsOptions.forEach((option, index) => {
      option.selected = (chipsIndex ?? 0).toString() === index.toString();
      const { selected, color } = option;

      if (selected) {
        document.documentElement.style.setProperty(
          '--basic-color',
          color ?? basicColor,
        );
      }
    });
  }

  toggleSelection(index: number, hex: string): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips, i: number) => ({
      ...option,
      selected: index === i,
    }));
     const prevChipsOptions = Object.assign([], this.chipsOptions);
    this.chipsOptions = [];
    setTimeout(() => {
      this.chipsOptions = prevChipsOptions;
    });
    document.documentElement.style.setProperty('--basic-color', hex);
  }
}
