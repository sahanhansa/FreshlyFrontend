import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryListPageComponent } from './laundry-list-page.component';

describe('LaundryListPageComponent', () => {
  let component: LaundryListPageComponent;
  let fixture: ComponentFixture<LaundryListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
