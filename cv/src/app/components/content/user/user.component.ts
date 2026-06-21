import { NgIf, UpperCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IInfo } from '@app/components/base-layout/base-layout.interface';

type EditableInfoField = 'firstName' | 'lastName' | 'position';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [NgIf, UpperCasePipe],
})
export class UserComponent implements AfterViewInit {
  @Input() info!: IInfo;
  @Input() isEditing = false;
  @Output() infoChange: EventEmitter<Partial<IInfo>> = new EventEmitter<
    Partial<IInfo>
  >();

  public readonly maxLengths: Record<EditableInfoField, number> = {
    firstName: 30,
    lastName: 30,
    position: 50,
  };

  public rubberBand = true;

  public onInputChange(field: EditableInfoField, value: string): void {
    const maxLength = this.maxLengths[field];
    const sanitizedValue = value.slice(0, maxLength);

    this.infoChange.emit({ [field]: sanitizedValue });
  }

  public getFontSize(field: EditableInfoField, value: string): string {
    const length = value?.length ?? 0;
    const maxLength = this.maxLengths[field];
    const baseSize = field === 'position' ? 30 : 54;
    const minSize = field === 'position' ? 16 : 28;
    const shrinkStart = field === 'position' ? 24 : 18;

    if (length <= shrinkStart) {
      return `${baseSize}px`;
    }

    const shrinkAmount = (length - shrinkStart) * 0.8;
    const computed = Math.max(minSize, baseSize - shrinkAmount);

    return `${computed}px`;
  }

  public getMaxLength(field: EditableInfoField): number {
    return this.maxLengths[field];
  }

  ngAfterViewInit(): void {
    this.rubberBand = !this.rubberBand;
  }
}
