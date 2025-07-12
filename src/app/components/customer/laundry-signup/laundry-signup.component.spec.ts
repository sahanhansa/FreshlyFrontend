import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundrySignupComponent } from './laundry-signup.component';

describe('LaundrySignupComponent', () => {
  let component: LaundrySignupComponent;
  let fixture: ComponentFixture<LaundrySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundrySignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundrySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
