import { TestBed } from '@angular/core/testing';

import { FabricTypeService } from './fabric-type.service';

describe('FabricTypeService', () => {
  let service: FabricTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
