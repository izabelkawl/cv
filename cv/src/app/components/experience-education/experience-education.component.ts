import { Component, Input } from '@angular/core';
import { IExperienceEducation } from './experience-education.interface';

@Component({
  selector: 'app-experience-education',
  templateUrl: './experience-education.component.html',
  styleUrls: ['./experience-education.component.scss'],
})
export class ExperienceEducationComponent {
  @Input() data!: IExperienceEducation[];
}
