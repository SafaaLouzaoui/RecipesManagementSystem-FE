import { TestBed } from '@angular/core/testing';

import { MoCleService } from './mo-cle.service';

describe('MoCleService', () => {
  let service: MoCleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoCleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
