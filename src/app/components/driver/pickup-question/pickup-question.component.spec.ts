import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupQuestionComponent } from './pickup-question.component';

describe('PickupQuestionComponent', () => {
  let component: PickupQuestionComponent;
  let fixture: ComponentFixture<PickupQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
