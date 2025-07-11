import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNoticeComponent } from './access-notice.component';

describe('AccessNoticeComponent', () => {
  let component: AccessNoticeComponent;
  let fixture: ComponentFixture<AccessNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
