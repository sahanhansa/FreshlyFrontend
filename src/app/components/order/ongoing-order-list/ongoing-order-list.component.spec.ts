import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingOrderListComponent } from './ongoing-order-list.component';

describe('OngoingOrderListComponent', () => {
  let component: OngoingOrderListComponent;
  let fixture: ComponentFixture<OngoingOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
