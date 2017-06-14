import { TestBed, inject } from '@angular/core/testing';

import { LayoutService } from './layout-service.service';

describe('LayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutServiceService]
    });
  });

  it('should be created', inject([LayoutService], (service: LayoutService) => {
    expect(service).toBeTruthy();
  }));
});
