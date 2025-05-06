import { TestBed } from '@angular/core/testing';

import { WashMethodService } from './wash-method.service';

describe('WashMethodService', () => {
  let service: WashMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WashMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
