import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplodingStarComponent } from './exploding-star.component';

describe('ExplodingStarComponent', () => {
  let component: ExplodingStarComponent;
  let fixture: ComponentFixture<ExplodingStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplodingStarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplodingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
