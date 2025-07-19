import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryItemCardComponent } from './laundry-item-card.component';

describe('LaundryItemCardComponent', () => {
  let component: LaundryItemCardComponent;
  let fixture: ComponentFixture<LaundryItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
