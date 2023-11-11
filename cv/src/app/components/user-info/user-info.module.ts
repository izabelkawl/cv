import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { UserInfoComponent } from './user-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { PhonePipe } from './user-info.pipe';

@NgModule({
  declarations: [UserInfoComponent, PhonePipe],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
