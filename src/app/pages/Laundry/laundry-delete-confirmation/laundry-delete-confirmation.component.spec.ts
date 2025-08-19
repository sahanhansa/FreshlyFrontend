import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryDeleteConfirmationComponent } from './laundry-delete-confirmation.component';

describe('LaundryDeleteConfirmationComponent', () => {
  let component: LaundryDeleteConfirmationComponent;
  let fixture: ComponentFixture<LaundryDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryDeleteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
