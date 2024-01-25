import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceEducationComponent } from './experience-education.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ExperienceEducationComponent', () => {
  let component: ExperienceEducationComponent;
  let fixture: ComponentFixture<ExperienceEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceEducationComponent],
      imports: [MaterialModule, CommonModule, TranslateModule.forRoot()],
    });
    fixture = TestBed.createComponent(ExperienceEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
