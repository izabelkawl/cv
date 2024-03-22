import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplodingStarComponent } from './exploding-star/exploding-star.component';
import { StarComponent } from './star/star.component';
import { StarsComponent } from './stars.component';
import { SkinnyStarComponent } from './skinny-star/skinny-star.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const starsModules = [
  ExplodingStarComponent,
  StarComponent,
  SkinnyStarComponent,
];

@NgModule({
  declarations: [StarsComponent],
  imports: [starsModules, CommonModule, BrowserAnimationsModule],
  exports: [starsModules, StarsComponent],
})
export class StarsModule {}
