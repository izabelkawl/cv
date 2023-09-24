import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PersonalInfoComponent } from './personal-info.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [PersonalInfoComponent],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [PersonalInfoComponent],
})
export class PersonalInfoModule {}
