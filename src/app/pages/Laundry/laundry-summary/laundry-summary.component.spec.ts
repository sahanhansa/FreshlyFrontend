import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundrySummaryComponent } from './laundry-summary.component';

describe('LaundrySummaryComponent', () => {
  let component: LaundrySummaryComponent;
  let fixture: ComponentFixture<LaundrySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundrySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundrySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
