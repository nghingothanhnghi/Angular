import { TestBed } from '@angular/core/testing';

import { ActivityNodeService } from './activity-node.service';

describe('ActivityNodeService', () => {
  let service: ActivityNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
