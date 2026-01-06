import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IButton } from './buttons.interfaces';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  standalone: true,
  imports: [NgClass, MatButtonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  @Input() buttonsConfig!: IButton[];

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  public onClick(id?: string) {
    this.clickEvent.emit(id);
  }
}
