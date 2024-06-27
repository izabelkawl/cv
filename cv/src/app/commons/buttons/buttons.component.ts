import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IButton } from './buttons.interfaces';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent {
  @Input() buttonsConfig!: IButton[];

  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  onClick(id?: string) {
    this.clickEvent.emit(id);
  }
}
