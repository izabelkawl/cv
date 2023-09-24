import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipsComponent } from './chips.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ChipsComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [ChipsComponent],
})
export class ChipsModule {}
