import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksToDoneButtonComponent } from './marks-to-done-button.component';

describe('MarksToDoneButtonComponent', () => {
  let component: MarksToDoneButtonComponent;
  let fixture: ComponentFixture<MarksToDoneButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarksToDoneButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarksToDoneButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
