import { NgModule } from '@angular/core';
import { SkillsComponent } from './skills.component';
import { RocketsModule } from 'src/app/commons/rockets/rockets.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SkillsComponent],
  imports: [RocketsModule, CommonModule],
  exports: [SkillsComponent]
})
export class SkillsModule {}
