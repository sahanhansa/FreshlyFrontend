import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedItemsComponent } from './rejected-items.component';

describe('RejectedItemsComponent', () => {
  let component: RejectedItemsComponent;
  let fixture: ComponentFixture<RejectedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
