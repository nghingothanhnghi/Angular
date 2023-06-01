import { TestBed } from '@angular/core/testing';

import { BuildLayoutService } from './build-layout.service';

describe('BuildLayoutService', () => {
  let service: BuildLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
