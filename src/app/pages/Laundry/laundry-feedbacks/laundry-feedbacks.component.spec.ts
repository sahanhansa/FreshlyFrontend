import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryFeedbacksComponent } from './laundry-feedbacks.component';

describe('LaundryFeedbacksComponent', () => {
  let component: LaundryFeedbacksComponent;
  let fixture: ComponentFixture<LaundryFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
