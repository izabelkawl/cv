import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { ISection } from '@app/components/base-layout/base-layout.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgFor, NgClass],
})
export class SectionComponent {
  @Input() formArray!: FormArray<FormGroup<ISection<FormControl>>>;
  @Input() editMode: boolean = false;
  @Input() heading: string = '';
  @Input() whiteColor: boolean = false;

  getPartialText(task: string): string[] {
    return task.split('**');
  }
}
