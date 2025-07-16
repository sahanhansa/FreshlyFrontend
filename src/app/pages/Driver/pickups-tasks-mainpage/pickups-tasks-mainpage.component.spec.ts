import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsTasksMainpageComponent } from './pickups-tasks-mainpage.component';

describe('PickupsTasksMainpageComponent', () => {
  let component: PickupsTasksMainpageComponent;
  let fixture: ComponentFixture<PickupsTasksMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupsTasksMainpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupsTasksMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
