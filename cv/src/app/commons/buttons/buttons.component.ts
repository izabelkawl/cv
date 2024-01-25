import { IButton } from './buttons.interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() buttonsConfig!: IButton[];

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  onClick(id?: string) {
    this.clickEvent.emit(id);
  }
}
