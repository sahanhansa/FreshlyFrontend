import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryOrdersComponent } from './laundry-orders.component';

describe('LaundryOrdersComponent', () => {
  let component: LaundryOrdersComponent;
  let fixture: ComponentFixture<LaundryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
