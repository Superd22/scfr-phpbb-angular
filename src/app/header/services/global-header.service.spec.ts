import { TestBed, inject } from '@angular/core/testing';

import { GlobalHeaderService } from './global-header.service';

describe('GlobalHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalHeaderService]
    });
  });

  it('should be created', inject([GlobalHeaderService], (service: GlobalHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
