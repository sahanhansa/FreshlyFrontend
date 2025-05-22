import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDetailsHeaderComponent } from './pickup-details-header.component';

describe('PickupDetailsHeaderComponent', () => {
  let component: PickupDetailsHeaderComponent;
  let fixture: ComponentFixture<PickupDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupDetailsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
