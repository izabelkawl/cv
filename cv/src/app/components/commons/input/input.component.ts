import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  value: string = '';

  disabled: boolean = false;

  onChange = (value: string): void => {};

  onTouched = (): void => {};

  public writeValue(value: string): void {
    if (value !== this.value) {
      this.value = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const text = (event.target as HTMLElement).innerText;
    console.log(text);
    this.onChange(text);
  }
}
