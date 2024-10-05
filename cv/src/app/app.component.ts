import { Component } from '@angular/core';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [BaseLayoutComponent],
})
export class AppComponent {}
