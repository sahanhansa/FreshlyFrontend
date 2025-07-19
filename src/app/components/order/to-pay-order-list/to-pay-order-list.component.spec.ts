import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPayOrderListComponent } from './to-pay-order-list.component';

describe('ToPayOrderListComponent', () => {
  let component: ToPayOrderListComponent;
  let fixture: ComponentFixture<ToPayOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToPayOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToPayOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
