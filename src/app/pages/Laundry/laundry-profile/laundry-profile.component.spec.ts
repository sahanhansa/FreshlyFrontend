import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryProfileComponent } from './laundry-profile.component';

describe('LaundryProfileComponent', () => {
  let component: LaundryProfileComponent;
  let fixture: ComponentFixture<LaundryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
