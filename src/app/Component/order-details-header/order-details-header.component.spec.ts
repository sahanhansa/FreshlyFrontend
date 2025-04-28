import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsHeaderComponent } from './order-details-header.component';

describe('OrderDetailsHeaderComponent', () => {
  let component: OrderDetailsHeaderComponent;
  let fixture: ComponentFixture<OrderDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
