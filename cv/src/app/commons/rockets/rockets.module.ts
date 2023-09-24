import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { RocketsComponent } from './rockets.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RocketsComponent],
  imports: [MaterialModule, CommonModule],
  exports: [RocketsComponent],
})
export class RocketsModule {}
