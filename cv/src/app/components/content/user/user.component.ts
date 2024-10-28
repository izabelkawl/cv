import { NgIf, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IInfo } from '@app/components/base-layout/base-layout.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [NgIf, UpperCasePipe],
})
export class UserComponent implements AfterViewInit {
  @Input() editMode: boolean = false;
  @Input() info!: FormGroup<IInfo<FormControl>>;

  public rubberBand = true;

  ngAfterViewInit(): void {
    this.rubberBand = !this.rubberBand;
  }
}
