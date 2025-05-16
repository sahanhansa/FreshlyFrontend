import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverContactusPageComponent } from './driver-contactus-page.component';

describe('DriverContactusPageComponent', () => {
  let component: DriverContactusPageComponent;
  let fixture: ComponentFixture<DriverContactusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverContactusPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverContactusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
