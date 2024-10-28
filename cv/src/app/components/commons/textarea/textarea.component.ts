import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent),
    },
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() config: { maxLength: number; rows: number, colorClass: 'white' | 'basic' } = {
    maxLength: 300,
    rows: 10,
    colorClass: 'white'
  };

  public inputValue!: string;
  public disabled: boolean = false;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  public writeValue(value: string): void {
    this.inputValue = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onBlur(): void {
    this.onTouched();
  }

  public onModelChange(value: string): void {
    this.onChange(value);
  }
}
