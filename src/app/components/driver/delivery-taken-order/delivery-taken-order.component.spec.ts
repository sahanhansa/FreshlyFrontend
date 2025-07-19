import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTakenOrderComponent } from './delivery-taken-order.component';

describe('DeliveryTakenOrderComponent', () => {
  let component: DeliveryTakenOrderComponent;
  let fixture: ComponentFixture<DeliveryTakenOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTakenOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTakenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
