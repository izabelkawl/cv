import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PersonalDataComponent } from './personal-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [PersonalDataComponent, PhonePipe],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [PersonalDataComponent],
})
export class PersonalDataModule {}
