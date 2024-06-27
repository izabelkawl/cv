import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PersonalDataComponent } from './personal-data.component';
import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [PersonalDataComponent, PhonePipe],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [PersonalDataComponent],
})
export class PersonalDataModule {}
