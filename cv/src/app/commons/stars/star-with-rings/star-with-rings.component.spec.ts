import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWithRingsComponent } from './star-with-rings.component';

describe('StarWithRingsComponent', () => {
  let component: StarWithRingsComponent;
  let fixture: ComponentFixture<StarWithRingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWithRingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarWithRingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
