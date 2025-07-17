import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmPopupComponent } from './order-confirm-popup.component';

describe('OrderConfirmPopupComponent', () => {
  let component: OrderConfirmPopupComponent;
  let fixture: ComponentFixture<OrderConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
