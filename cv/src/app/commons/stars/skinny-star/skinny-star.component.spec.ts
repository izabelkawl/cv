import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinnyStarComponent } from './skinny-star.component';

describe('SkinnyStarComponent', () => {
  let component: SkinnyStarComponent;
  let fixture: ComponentFixture<SkinnyStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinnyStarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkinnyStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
