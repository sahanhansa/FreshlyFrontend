import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsPendingOrderDetailsComponent } from './pickups-pending-order-details.component';

describe('PickupsPendingOrderDetailsComponent', () => {
  let component: PickupsPendingOrderDetailsComponent;
  let fixture: ComponentFixture<PickupsPendingOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupsPendingOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupsPendingOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
