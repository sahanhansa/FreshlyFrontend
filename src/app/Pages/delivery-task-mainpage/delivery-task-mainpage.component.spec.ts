import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTaskMainpageComponent } from './delivery-task-mainpage.component';

describe('DeliveryTaskMainpageComponent', () => {
  let component: DeliveryTaskMainpageComponent;
  let fixture: ComponentFixture<DeliveryTaskMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTaskMainpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTaskMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
