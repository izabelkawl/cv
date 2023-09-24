import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ExperienceEducationComponent } from './experience-education.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ExperienceEducationComponent],
  imports: [MaterialModule, CommonModule],
  exports: [ExperienceEducationComponent],
})
export class ExperienceEducationModule {}
