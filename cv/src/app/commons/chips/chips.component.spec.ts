import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipsComponent } from './chips.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IChips } from './chips.interfaces';

describe('ChipsComponent', () => {
  let component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsComponent],
      imports: [CommonModule, MaterialModule, TranslateModule.forRoot()],
    });
    fixture = TestBed.createComponent(ChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change selected chips with index 2', () => {
    const expected: IChips[] = [
      { name: 'navyBlue', color: '#27384c', selected: false },
      { name: 'green', color: '#89A666', selected: false },
      { name: 'red', color: '#F2055C', selected: true },
    ];
    fixture.componentInstance.toggleSelection(2, '#F2055C');
    const result = fixture.componentInstance.chipsOptions;

    expect(result).toEqual(expected);
  });

  it('should change session storage value chipsIndex to 2', () => {
    const expectedIndex = 2;
    fixture.componentInstance.toggleSelection(expectedIndex, '#F2055C');
    const result = Number(sessionStorage.getItem('chipsIndex'));

    expect(expectedIndex).toEqual(result);
  });
});
