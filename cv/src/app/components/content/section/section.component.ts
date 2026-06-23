import { NgClass, NgFor } from '@angular/common';
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
import { ISection } from './section.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgFor, NgClass, MatButtonModule],
})
export class SectionComponent implements OnChanges {
  @Input() data!: ISection[];
  @Input() heading: string = '';
  @Input() whiteColor: boolean = false;
  @Input() isEditing = false;
  @Output() dataChange: EventEmitter<ISection[]> = new EventEmitter();

  public editableData: ISection[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.editableData = JSON.parse(JSON.stringify(this.data)).map(
        (section: ISection) => this.normalizeSection(section),
      );
    }

    if (changes['isEditing'] && this.isEditing && !this.editableData.length) {
      this.editableData = [this.createEmptySection()];
      this.emitChange();
    }
  }

  getPartialText(task: string): string[] {
    return task.split('**');
  }

  public addSection(): void {
    this.editableData.push(this.createEmptySection());
    this.emitChange();
  }

  public removeSection(index: number): void {
    if (this.editableData.length <= 1) return;
    this.editableData.splice(index, 1);
    this.emitChange();
  }

  public updateTitle(index: number, value: string): void {
    this.editableData[index].title = value;
    this.emitChange();
  }

  public updatePeriod(index: number, value: string): void {
    this.editableData[index].period = value;
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

  private createEmptySection(): ISection {
    return {
      title: '',
      subTitle: '',
      period: '',
      description: [''],
    };
  }

  private normalizeSection(section: ISection): ISection {
    return {
      ...this.createEmptySection(),
      ...section,
      description: section.description?.length ? section.description : [''],
    };
  }

  private emitChange(): void {
    this.dataChange.emit(this.editableData);
  }
}
