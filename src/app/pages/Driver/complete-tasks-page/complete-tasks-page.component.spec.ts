import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTasksPageComponent } from './complete-tasks-page.component';

describe('CompleteTasksPageComponent', () => {
  let component: CompleteTasksPageComponent;
  let fixture: ComponentFixture<CompleteTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTasksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
