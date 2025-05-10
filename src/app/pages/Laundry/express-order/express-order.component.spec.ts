import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressOrderComponent } from './express-order.component';

describe('ExpressOrderComponent', () => {
  let component: ExpressOrderComponent;
  let fixture: ComponentFixture<ExpressOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
