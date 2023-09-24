import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

const modules: any[] = [MatButtonModule, MatIconModule, MatChipsModule];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
