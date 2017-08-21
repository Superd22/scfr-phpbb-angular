import { TestBed, inject } from '@angular/core/testing';

import { HeaderService } from './header-service.service';

describe('HeaderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderService]
    });
  });

  it('should be created', inject([HeaderService], (service: HeaderService) => {
    expect(service).toBeTruthy();
  }));
});
