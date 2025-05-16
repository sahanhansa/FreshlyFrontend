import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryQuestion2Component } from './delivery-question-2.component';

describe('DeliveryQuestion2Component', () => {
  let component: DeliveryQuestion2Component;
  let fixture: ComponentFixture<DeliveryQuestion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryQuestion2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryQuestion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
