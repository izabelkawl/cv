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
      { name: 'navyBlue', color: '#345B89', selected: true },
      { name: 'orange', color: '#F27405', selected: false },
      { name: 'purple', color: '#6E52C3', selected: false },
    ];
    fixture.componentInstance.toggleSelection(2, '#6E52C3');
    const result = fixture.componentInstance.chipsOptions;

    expect(result).toEqual(expected);
  });

  it('should change session storage value chipsIndex to 2', () => {
    const expectedIndex = 2;
    fixture.componentInstance.toggleSelection(expectedIndex, '#6E52C3');
    const result = Number(sessionStorage.getItem('chipsIndex'));

    expect(expectedIndex).toEqual(result);
  });
});
