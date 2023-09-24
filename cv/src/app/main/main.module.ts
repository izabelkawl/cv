import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '../commons/buttons/buttons.module';
import { ChipsModule } from '../commons/chips/chips.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot(),
    ComponentsModule,
    ButtonsModule,
    ChipsModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
