import { NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ISection } from './section.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgFor, NgClass, UpperCasePipe],
})
export class SectionComponent {
  @Input() data!: ISection[];
  @Input() heading: string = '';

  getPartialText(task: string): string[] {
    return task.split('**');
  }
}
