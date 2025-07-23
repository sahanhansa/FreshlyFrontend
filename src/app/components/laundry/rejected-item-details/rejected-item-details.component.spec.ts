import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedItemDetailsComponent } from './rejected-item-details.component';

describe('RejectedItemDetailsComponent', () => {
  let component: RejectedItemDetailsComponent;
  let fixture: ComponentFixture<RejectedItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedItemDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
