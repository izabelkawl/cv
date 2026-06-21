import { CommonModule, NgFor, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ISection } from '../section/section.interface';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor, NgClass, MatButtonModule, TranslateModule],
})
export class SpecializationsComponent implements OnChanges {
  @Input() data: ISection[] = [];
  @Input() isEditing = false;
  @Output() dataChange: EventEmitter<ISection[]> = new EventEmitter();

  public editableData: ISection[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.editableData = JSON.parse(JSON.stringify(this.data));
    }
  }

  public addSpecialization(): void {
    this.editableData.push({ subTitle: '', description: [''] } as ISection);
    this.emitChange();
  }

  public removeSpecialization(index: number): void {
    if (this.editableData.length <= 1) return;
    this.editableData.splice(index, 1);
    this.emitChange();
  }

  public updateSubTitle(index: number, value: string): void {
    this.editableData[index].subTitle = value;
    this.emitChange();
  }

  public addDescription(sectionIndex: number): void {
    this.editableData[sectionIndex].description =
      this.editableData[sectionIndex].description || [];
    this.editableData[sectionIndex].description.push('');
    this.emitChange();
  }

  public removeDescription(sectionIndex: number, descIndex: number): void {
    const desc = this.editableData[sectionIndex].description || [];
    if (desc.length <= 1) return;
    desc.splice(descIndex, 1);
    this.emitChange();
  }

  public updateDescription(
    sectionIndex: number,
    descIndex: number,
    value: string,
  ): void {
    this.editableData[sectionIndex].description![descIndex] = value;
    this.emitChange();
  }

  public hasSingleDescription(spec: ISection): boolean {
    return !spec.description || spec.description.length <= 1;
  }

  private emitChange(): void {
    this.dataChange.emit(this.editableData);
  }
}
