import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Colors, SessionStorageKeys } from '@app/shared/enums/variables';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  standalone: true,
  imports: [TranslateModule, AsyncPipe, NgFor, MatChipsModule, MatIconModule, 
    MatFormFieldModule,
    MatInputModule,],
})
export class ChipsComponent implements OnInit {
  private chipsOptions: IChips[] = [
    { name: 'ORANGE', color: '#FF7272', selected: false },
    { name: 'NAVY_BLUE', color: '#345B89', selected: false },
    { name: 'PURPLE', color: '#ff1abf', selected: false },
  ];

  ngOnInit(): void {
    try {
      this.setColor();
    } catch (e) {}
  }

  private setColor(): void {
    const chipsIndex: string =
      sessionStorage?.getItem(SessionStorageKeys.CHIPS_INDEX) ?? '0';
    const basicColor: string = getComputedStyle(document.body).getPropertyValue(
      Colors.BASIC,
    );
    this.chipsOptions.forEach((option, index) => {
      option.selected = chipsIndex === index.toString();
      const { selected, color } = option;

      selected &&
        document.documentElement.style.setProperty(
          Colors.BASIC,
          color ?? basicColor,
        );
    });
  }

  public toggleSelection(index: number, hex: string): void {
    this.chipsOptions = this.chipsOptions.map((option: IChips, i: number) => ({
      ...option,
      selected: index === i,
    }));
    document.documentElement.style.setProperty(Colors.BASIC, hex);
    sessionStorage?.setItem(SessionStorageKeys.CHIPS_INDEX, index.toString());
  }

  public get options(): Observable<IChips[]> {
    return of(this.chipsOptions);
  }
}

interface IChips {
  name: string;
  color: string;
  selected?: boolean;
}
