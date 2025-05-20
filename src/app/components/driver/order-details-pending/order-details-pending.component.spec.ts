import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsPendingComponent } from './order-details-pending.component';

describe('OrderDetailsPendingComponent', () => {
  let component: OrderDetailsPendingComponent;
  let fixture: ComponentFixture<OrderDetailsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsPendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
