import { TestBed } from '@angular/core/testing';

import { DetailProcessLogsService } from './detail-process-logs.service';

describe('DetailProcessLogsService', () => {
  let service: DetailProcessLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailProcessLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
