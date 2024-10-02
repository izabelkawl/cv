import { Component } from '@angular/core';
import { StarsComponent } from './commons/stars/stars.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [StarsComponent, BaseLayoutComponent],
})
export class AppComponent {}
