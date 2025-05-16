import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderListComponent } from './pending-order-list.component';

describe('PendingOrderListComponent', () => {
  let component: PendingOrderListComponent;
  let fixture: ComponentFixture<PendingOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
