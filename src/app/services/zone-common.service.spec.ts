import { TestBed } from '@angular/core/testing';

import { ZoneCommonService } from './zone-common.service';

describe('ZoneCommonService', () => {
  let service: ZoneCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
