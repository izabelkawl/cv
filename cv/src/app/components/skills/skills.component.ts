import { Component, Input } from '@angular/core';
import { ISkills } from './skills.interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  @Input() data!: ISkills[];
}
