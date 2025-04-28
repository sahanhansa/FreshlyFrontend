import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsCompleteOrderDetailsComponent } from './pickups-complete-order-details.component';

describe('PickupsCompleteOrderDerailsComponent', () => {
  let component: PickupsCompleteOrderDetailsComponent;
  let fixture: ComponentFixture<PickupsCompleteOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupsCompleteOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupsCompleteOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
