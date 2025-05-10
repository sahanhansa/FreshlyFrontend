import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastOrderListComponent } from './past-order-list.component';

describe('PastOrderListComponent', () => {
  let component: PastOrderListComponent;
  let fixture: ComponentFixture<PastOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
