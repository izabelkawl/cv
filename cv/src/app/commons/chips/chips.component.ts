import { Component, OnInit } from '@angular/core';
import { IChips } from './chips.interfaces';
import { Colors } from 'src/shared/enums/variables';
import { Observable, of } from 'rxjs';

const { BASIC } = Colors;

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
      color: '#89A666',
      selected: false,
    },
    {
      name: 'orange',
      color: '#F25D27',
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
      BASIC,
    );
    this.chipsOptions.forEach((option, index) => {
      option.selected = (chipsIndex ?? 0).toString() === index.toString();
      const { selected, color } = option;

      if (selected) {
        document.documentElement.style.setProperty(BASIC, color ?? basicColor);
      }
    });
  }

  toggleSelection(index: number, hex: string): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips, i: number) => ({
      ...option,
      selected: index === i,
    }));
    document.documentElement.style.setProperty(BASIC, hex);
    sessionStorage?.setItem('chipsIndex', index.toString());
  }

  get options(): Observable<IChips[]> {
    return of(this.chipsOptions);
  }
}
