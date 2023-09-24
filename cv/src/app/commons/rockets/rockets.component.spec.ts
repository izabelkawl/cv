import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RocketsComponent } from './rockets.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { CommonModule } from '@angular/common';

describe('RocketsComponent', () => {
  let component: RocketsComponent;
  let fixture: ComponentFixture<RocketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RocketsComponent],
      imports: [MaterialModule, CommonModule],
    });
    fixture = TestBed.createComponent(RocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
