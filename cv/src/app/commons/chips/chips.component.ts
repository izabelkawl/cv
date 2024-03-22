import { Component, OnInit } from '@angular/core';
import { ColorHexTypes, IChips } from './chips.interfaces';
import { Colors, SessionStorageKeys } from 'src/shared/enums/variables';
import { Observable, of } from 'rxjs';

const { BASIC } = Colors;
const { CHIPS_INDEX } = SessionStorageKeys;

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
})
export class ChipsComponent implements OnInit {
  chipsOptions: IChips[] = [
    { name: 'navyBlue', color: '#345B89', selected: true },
    { name: 'orange', color: '#F27405', selected: false },
    { name: 'purple', color: '#6E52C3', selected: false },
  ];

  ngOnInit(): void {
    try {
      this.setColor();
    } catch (e) {}
  }

  setColor(): void {
    const chipsIndex: string = sessionStorage?.getItem(CHIPS_INDEX) ?? '0';
    const basicColor: string = getComputedStyle(document.body).getPropertyValue(
      BASIC,
    );
    this.chipsOptions.forEach((option, index) => {
      option.selected = chipsIndex === index.toString();
      const { selected, color } = option;

      selected &&
        document.documentElement.style.setProperty(BASIC, color ?? basicColor);
    });
  }

  toggleSelection(index: number, hex: ColorHexTypes): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips, i: number) => ({
      ...option,
      selected: index === i,
    }));
    document.documentElement.style.setProperty(BASIC, hex);
    sessionStorage?.setItem(CHIPS_INDEX, index.toString());
  }

  get options(): Observable<IChips[]> {
    return of(this.chipsOptions);
  }
}
