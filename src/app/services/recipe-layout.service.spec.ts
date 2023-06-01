import { TestBed } from '@angular/core/testing';

import { RecipeLayoutService } from './recipe-layout.service';

describe('RecipeLayoutService', () => {
  let service: RecipeLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
