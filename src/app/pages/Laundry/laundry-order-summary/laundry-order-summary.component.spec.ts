import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryOrderSummaryComponent } from './laundry-order-summary.component';

describe('LaundryOrderSummaryComponent', () => {
  let component: LaundryOrderSummaryComponent;
  let fixture: ComponentFixture<LaundryOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
