import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundrysignComponent } from './laundrysign.component';

describe('LaundrysignComponent', () => {
  let component: LaundrysignComponent;
  let fixture: ComponentFixture<LaundrysignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundrysignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundrysignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
