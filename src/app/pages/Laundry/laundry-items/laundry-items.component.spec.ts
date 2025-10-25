import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryItemsComponent } from './laundry-items.component';

describe('LaundryItemsComponent', () => {
  let component: LaundryItemsComponent;
  let fixture: ComponentFixture<LaundryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
