import { TestBed } from '@angular/core/testing';

import { CallSrService } from './call-sr.service';

describe('CallSrService', () => {
  let service: CallSrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallSrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
