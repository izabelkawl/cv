import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '../commons/buttons/buttons.module';
import { ChipsModule } from '../commons/chips/chips.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { IPersonalInformation } from './main.interface';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        MaterialModule,
        CommonModule,
        TranslateModule.forRoot(),
        ComponentsModule,
        ButtonsModule,
        ChipsModule,
      ],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should return the correct keys', () => {
    const info: IPersonalInformation = {
      info: {
        person: '',
        avatar: '',
        phone: '',
        email: '',
        linkedIn: '',
      },
      experience: [],
      education: [],
      skills: [],
    };
    const expected = ['experience', 'education', 'skills'];
    const result = fixture.componentInstance.sectionKeys(info);
    expect(result).toEqual(expected);
  });
});
