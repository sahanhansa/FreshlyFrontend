import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTasksHeaderComponent } from './pickup-tasks-header.component';

describe('PickupTasksHeaderComponent', () => {
  let component: PickupTasksHeaderComponent;
  let fixture: ComponentFixture<PickupTasksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupTasksHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupTasksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
