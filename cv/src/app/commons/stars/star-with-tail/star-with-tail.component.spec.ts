import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWithTailComponent } from './star-with-tail.component';

describe('StarWithTailComponent', () => {
  let component: StarWithTailComponent;
  let fixture: ComponentFixture<StarWithTailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWithTailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarWithTailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
