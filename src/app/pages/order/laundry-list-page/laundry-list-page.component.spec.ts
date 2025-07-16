import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryPageComponent } from './laundry-list-page.component';

describe('LaundryPageComponent', () => {
  let component: LaundryPageComponent;
  let fixture: ComponentFixture<LaundryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
