import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '../commons/buttons/buttons.module';
import { ChipsModule } from '../commons/chips/chips.module';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [CommonModule, TranslateModule.forRoot(), ComponentsModule, ButtonsModule, ChipsModule],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
