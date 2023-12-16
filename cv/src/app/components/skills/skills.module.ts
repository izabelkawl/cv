import { NgModule } from '@angular/core';
import { SkillsComponent } from './skills.component';
import { RocketsModule } from 'src/app/commons/rockets/rockets.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SkillsComponent],
  imports: [RocketsModule, CommonModule, TranslateModule],
  exports: [SkillsComponent]
})
export class SkillsModule {}
