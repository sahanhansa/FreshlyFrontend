import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPayOrderCardComponent } from './to-pay-order-card.component';

describe('ToPayOrderCardComponent', () => {
  let component: ToPayOrderCardComponent;
  let fixture: ComponentFixture<ToPayOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToPayOrderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToPayOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
