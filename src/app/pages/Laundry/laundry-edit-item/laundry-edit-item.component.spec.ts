import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryEditItemComponent } from './laundry-edit-item.component';

describe('LaundryEditItemComponent', () => {
  let component: LaundryEditItemComponent;
  let fixture: ComponentFixture<LaundryEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryEditItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
