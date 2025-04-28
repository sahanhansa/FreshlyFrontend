import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsCompleteOrderDetailsPageComponent } from './pickups-complete-order-details-page.component';

describe('PickupsCompleteOrderDetailsPageComponent', () => {
  let component: PickupsCompleteOrderDetailsPageComponent;
  let fixture: ComponentFixture<PickupsCompleteOrderDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupsCompleteOrderDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupsCompleteOrderDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
