import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderCardComponent } from './delivery-order-card.component';

describe('DeliveryOrderCardComponent', () => {
  let component: DeliveryOrderCardComponent;
  let fixture: ComponentFixture<DeliveryOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryOrderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
