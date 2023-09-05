import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const modules: any[] = [MatButtonModule, MatIconModule];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ...modules],
  exports: modules,
})
export class MaterialModule {}
