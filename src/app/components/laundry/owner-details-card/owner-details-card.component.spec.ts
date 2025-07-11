import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDetailsCardComponent } from './owner-details-card.component';

describe('OwnerDetailsCardComponent', () => {
  let component: OwnerDetailsCardComponent;
  let fixture: ComponentFixture<OwnerDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
