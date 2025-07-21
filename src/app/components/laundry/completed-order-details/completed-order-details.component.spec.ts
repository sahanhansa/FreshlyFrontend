import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrderDetailsComponent } from './completed-order-details.component';

describe('CompletedOrderDetailsComponent', () => {
  let component: CompletedOrderDetailsComponent;
  let fixture: ComponentFixture<CompletedOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
