import { NgModule } from '@angular/core';
import { ButtonsComponent } from './buttons.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ButtonsComponent],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [ButtonsComponent],
})
export class ButtonsModule {}
