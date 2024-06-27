import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ExperienceEducationComponent } from './experience-education.component';

@NgModule({
  declarations: [ExperienceEducationComponent],
  imports: [MaterialModule, CommonModule, TranslateModule],
  exports: [ExperienceEducationComponent],
})
export class ExperienceEducationModule {}
