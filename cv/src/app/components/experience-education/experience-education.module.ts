import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ExperienceEducationComponent } from './experience-education.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ExperienceEducationComponent],
  imports: [MaterialModule, CommonModule, TranslateModule],
  exports: [ExperienceEducationComponent],
})
export class ExperienceEducationModule {}
