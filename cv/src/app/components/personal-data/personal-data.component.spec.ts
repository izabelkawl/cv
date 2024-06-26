import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PersonalDataComponent } from './personal-data.component';
import { PhonePipe } from './phone.pipe';

describe('PersonalDataComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDataComponent, PhonePipe],
      imports: [MaterialModule, TranslateModule.forRoot(), BrowserModule, CommonModule],
    });
    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide phone number if key is "phone" and the "hideNumber" variable is equal true', () => {
    const key = 'phone';
    const number = '(+48) 733 253 028';
    const expected = '(+48) 733 *** 028';
    const phonePipeRes = new PhonePipe().transform(number, key, true);
    expect(phonePipeRes).toEqual(expected);
  });

  it('should not hide phone number if key is "email"', () => {
    const key = 'email';
    const email = 'izabelawlazlo9@gmail.com';
    const expected = 'izabelawlazlo9@gmail.com';
    const hideNumber = true;
    const result = new PhonePipe().transform(email, key, hideNumber);

    expect(hideNumber).toEqual(true);
    expect(key).toEqual('email');
    expect(expected).toEqual(result);
  });

  it('should not hide phone number if key is "linkedIn"', () => {
    const key = 'linkedIn';
    const linkedIn = '@izabelawl';
    const expected = '@izabelawl';
    const hideNumber = true;
    const result = new PhonePipe().transform(linkedIn, key, hideNumber);

    expect(hideNumber).toEqual(true);
    expect(key).toEqual('linkedIn');
    expect(expected).toEqual(result);
  });
});
