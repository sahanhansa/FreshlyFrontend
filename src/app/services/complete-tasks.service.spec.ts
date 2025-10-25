import { TestBed } from '@angular/core/testing';

import { CompleteTasksService } from './complete-tasks.service';

describe('CompleteTasksService', () => {
  let service: CompleteTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
