import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryCardComponent } from './laundry-card.component';

describe('LaundryCardComponent', () => {
  let component: LaundryCardComponent;
  let fixture: ComponentFixture<LaundryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
