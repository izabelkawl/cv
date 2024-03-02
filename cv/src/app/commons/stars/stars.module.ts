import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWithTailComponent } from './star-with-tail/star-with-tail.component';
import { StarComponent } from './star/star.component';
import { StarsComponent } from './stars.component';
import { StarWithRingsComponent } from './star-with-rings/star-with-rings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const starsModules = [
  StarWithTailComponent,
  StarComponent,
  StarWithRingsComponent,
];

@NgModule({
  declarations: [StarsComponent],
  imports: [starsModules, CommonModule, BrowserAnimationsModule],
  exports: [starsModules, StarsComponent],
})
export class StarsModule {}
