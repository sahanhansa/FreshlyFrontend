import { TestBed } from '@angular/core/testing';

import { RejectedItemService } from './rejected-item.service';

describe('RejectedItemService', () => {
  let service: RejectedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
