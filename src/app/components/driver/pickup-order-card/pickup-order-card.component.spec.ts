import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupOrderCardComponent } from './pickup-order-card.component';

describe('OrderCardComponent', () => {
  let component: PickupOrderCardComponent;
  let fixture: ComponentFixture<PickupOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupOrderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
