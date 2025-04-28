import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderPickupsComponent } from './confirm-order-pickups.component';

describe('ConfirmOrderPickupsComponent', () => {
  let component: ConfirmOrderPickupsComponent;
  let fixture: ComponentFixture<ConfirmOrderPickupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmOrderPickupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
