import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsComponent } from './skills.component';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule, TranslateModule.forRoot()],
  exports: [SkillsComponent]
})
export class SkillsModule {}
