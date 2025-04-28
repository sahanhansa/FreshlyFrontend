import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktoPickupsButtonComponent } from './backto-pickups-button.component';

describe('BacktoPickupsButtonComponent', () => {
  let component: BacktoPickupsButtonComponent;
  let fixture: ComponentFixture<BacktoPickupsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacktoPickupsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktoPickupsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
