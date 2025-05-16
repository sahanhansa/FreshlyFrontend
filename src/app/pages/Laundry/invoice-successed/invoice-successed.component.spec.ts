import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSuccessedComponent } from './invoice-successed.component';

describe('InvoiceSuccessedComponent', () => {
  let component: InvoiceSuccessedComponent;
  let fixture: ComponentFixture<InvoiceSuccessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSuccessedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSuccessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
