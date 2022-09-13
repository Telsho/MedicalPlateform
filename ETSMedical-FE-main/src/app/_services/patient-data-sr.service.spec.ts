import { TestBed } from '@angular/core/testing';

import { PatientDataSrService } from './patient-data-sr.service';

describe('PatientDataSrService', () => {
  let service: PatientDataSrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientDataSrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
