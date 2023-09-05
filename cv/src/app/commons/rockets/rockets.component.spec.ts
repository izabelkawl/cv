import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RocketsComponent } from './rockets.component';

describe('RocketsComponent', () => {
  let component: RocketsComponent;
  let fixture: ComponentFixture<RocketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RocketsComponent]
    });
    fixture = TestBed.createComponent(RocketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
