import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunLoginComponent } from './lun-login.component';

describe('LoginComponent', () => {
  let component: LunLoginComponent;
  let fixture: ComponentFixture<LunLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
