import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTakenOrderComponent } from './driver-taken-order.component';

describe('DriverTakenOrderComponent', () => {
  let component: DriverTakenOrderComponent;
  let fixture: ComponentFixture<DriverTakenOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTakenOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTakenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
