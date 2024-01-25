import { NgModule } from '@angular/core';
import { SkillsComponent } from './skills.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SkillsComponent],
  imports: [CommonModule, TranslateModule.forRoot()],
  exports: [SkillsComponent]
})
export class SkillsModule {}
