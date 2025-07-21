import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrderCardComponent } from './completed-order-card.component';

describe('CompletedOrderCardComponent', () => {
  let component: CompletedOrderCardComponent;
  let fixture: ComponentFixture<CompletedOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedOrderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
