import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTaskHeaderComponent } from './complete-task-header.component';

describe('CompleteTaskHeaderComponent', () => {
  let component: CompleteTaskHeaderComponent;
  let fixture: ComponentFixture<CompleteTaskHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTaskHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTaskHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
