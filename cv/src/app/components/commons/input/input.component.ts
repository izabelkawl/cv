import { TranslateModule } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('input') inputRef!: ElementRef;

  @Input() placeholder!: string;

  @Output() isEditMode: EventEmitter<void> = new EventEmitter();

  public inputValue!: string;
  public disabled: boolean = false;

  public ngAfterViewInit(): void {
    this.inputRef.nativeElement.focus();
  }

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
    this.isEditMode.emit();
  }

  public onModelChange(value: string): void {
    this.onChange(value);
  }
}
