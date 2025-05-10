import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTaskHeaderComponent } from './delivery-task-header.component';

describe('DeliveryTaskHeaderComponent', () => {
  let component: DeliveryTaskHeaderComponent;
  let fixture: ComponentFixture<DeliveryTaskHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryTaskHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryTaskHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
