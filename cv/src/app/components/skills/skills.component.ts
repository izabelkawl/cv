import { Component, Input } from '@angular/core';
import { ISkill } from 'src/app/main/main.interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  @Input() data!: ISkill[];
}
