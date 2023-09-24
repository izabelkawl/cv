import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsComponent } from './chips.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { CommonModule } from '@angular/common';

describe('ChipsComponent', () => {
  let component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsComponent],
      imports: [CommonModule, MaterialModule],
    });
    fixture = TestBed.createComponent(ChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
