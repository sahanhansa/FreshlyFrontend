import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOrderDetailsComponent } from './processing-order-details.component';

describe('ProcessingOrderDetailsComponent', () => {
  let component: ProcessingOrderDetailsComponent;
  let fixture: ComponentFixture<ProcessingOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessingOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
