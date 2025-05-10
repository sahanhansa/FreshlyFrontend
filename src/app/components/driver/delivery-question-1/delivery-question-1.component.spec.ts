import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryQuestion1Component } from './delivery-question-1.component';

describe('DeliveryQuestion1Component', () => {
  let component: DeliveryQuestion1Component;
  let fixture: ComponentFixture<DeliveryQuestion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryQuestion1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryQuestion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
