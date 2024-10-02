import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IExperienceEducation } from './section.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgFor, NgClass],
})
export class SectionComponent {
  @Input() data!: IExperienceEducation[];
}
