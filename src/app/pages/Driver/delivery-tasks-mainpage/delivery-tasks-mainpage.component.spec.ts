import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTasksMainpageComponent } from './delivery-tasks-mainpage.component';

describe('DeliveryTasksMainpageComponent', () => {
  let component: DeliveryTasksMainpageComponent;
  let fixture: ComponentFixture<DeliveryTasksMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTasksMainpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTasksMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
