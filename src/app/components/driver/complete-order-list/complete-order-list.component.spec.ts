import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOrderListComponent } from './complete-order-list.component';

describe('CompleteOrderListComponent', () => {
  let component: CompleteOrderListComponent;
  let fixture: ComponentFixture<CompleteOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
