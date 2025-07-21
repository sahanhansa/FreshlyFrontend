import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderDetailsComponent } from './new-order-details.component';

describe('NewOrderDetailsComponent', () => {
  let component: NewOrderDetailsComponent;
  let fixture: ComponentFixture<NewOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
