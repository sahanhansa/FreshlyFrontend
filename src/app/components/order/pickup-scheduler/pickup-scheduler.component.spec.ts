import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupSchedulerComponent } from './pickup-scheduler.component';

describe('PickupSchedulerComponent', () => {
  let component: PickupSchedulerComponent;
  let fixture: ComponentFixture<PickupSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupSchedulerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
