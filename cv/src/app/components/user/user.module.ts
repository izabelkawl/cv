import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { UserComponent } from './user.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [UserComponent],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [UserComponent],
})
export class UserModule {}
