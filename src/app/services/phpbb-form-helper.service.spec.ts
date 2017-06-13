import { TestBed, inject } from '@angular/core/testing';

import { PhpbbFormHelperService } from './phpbb-form-helper.service';

describe('PhpbbFormHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhpbbFormHelperService]
    });
  });

  it('should be created', inject([PhpbbFormHelperService], (service: PhpbbFormHelperService) => {
    expect(service).toBeTruthy();
  }));
});
