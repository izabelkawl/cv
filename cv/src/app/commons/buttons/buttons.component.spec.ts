import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ButtonsComponent } from './buttons.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsComponent],
      imports: [CommonModule, MaterialModule, TranslateModule],
    });
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
