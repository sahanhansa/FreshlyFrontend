import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryAddItemComponent } from './laundry-add-item.component';

describe('LaundryAddItemComponent', () => {
  let component: LaundryAddItemComponent;
  let fixture: ComponentFixture<LaundryAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryAddItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
