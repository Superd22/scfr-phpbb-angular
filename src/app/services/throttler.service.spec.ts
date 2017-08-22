import { TestBed, inject } from '@angular/core/testing';

import { ThrottlerService } from './throttler.service';

describe('ThrottlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThrottlerService]
    });
  });

  it('should be created', inject([ThrottlerService], (service: ThrottlerService) => {
    expect(service).toBeTruthy();
  }));
});
