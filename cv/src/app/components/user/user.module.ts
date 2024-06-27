import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [MaterialModule, TranslateModule, BrowserModule, CommonModule],
  exports: [UserComponent],
})
export class UserModule {}
