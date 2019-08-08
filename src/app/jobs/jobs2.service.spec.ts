import { TestBed } from '@angular/core/testing';

import { Jobs2Service } from './jobs2.service';

describe('Jobs2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Jobs2Service = TestBed.get(Jobs2Service);
    expect(service).toBeTruthy();
  });
});
