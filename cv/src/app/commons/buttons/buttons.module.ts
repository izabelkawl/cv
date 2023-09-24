import { NgModule } from '@angular/core';
import { ButtonsComponent } from './buttons.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';

@NgModule({
  declarations: [ButtonsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ButtonsComponent],
})
export class ButtonsModule {}
