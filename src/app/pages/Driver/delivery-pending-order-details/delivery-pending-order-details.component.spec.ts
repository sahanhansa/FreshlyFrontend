import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPendingOrderDetailsComponent } from './delivery-pending-order-details.component';

describe('DeliveryPendingOrderDetailsComponent', () => {
  let component: DeliveryPendingOrderDetailsComponent;
  let fixture: ComponentFixture<DeliveryPendingOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPendingOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPendingOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
