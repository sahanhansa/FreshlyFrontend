import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryHomeComponent } from './laundry-home.component';

describe('LaundryHomeComponent', () => {
  let component: LaundryHomeComponent;
  let fixture: ComponentFixture<LaundryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
