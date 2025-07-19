import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrderListComponent } from './completed-order-list.component';

describe('CompletedOrderListComponent', () => {
  let component: CompletedOrderListComponent;
  let fixture: ComponentFixture<CompletedOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
