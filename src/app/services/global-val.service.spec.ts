import { TestBed } from '@angular/core/testing';

import { GlobalValService } from './global-val.service';

describe('GlobalValService', () => {
  let service: GlobalValService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalValService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
