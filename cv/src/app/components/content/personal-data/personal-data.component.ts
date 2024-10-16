import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../commons/input/input.component';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
  ],
})
export class PersonalDataComponent {
  @Input() form!: any;

  public openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/izabelawl/', '_blank');
  }

  public openMail(): void {
    window.open('mailto:izabelawlazlo9@gmail.com');
  }
}
