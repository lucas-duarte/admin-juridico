import { TestBed } from '@angular/core/testing';

import { TeseService } from './tese.service';

describe('TeseService', () => {
  let service: TeseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
