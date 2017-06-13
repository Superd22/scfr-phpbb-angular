import { TestBed, inject } from '@angular/core/testing';

import { LanguageProviderService } from './language-provider.service';

describe('LanguageProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageProviderService]
    });
  });

  it('should be created', inject([LanguageProviderService], (service: LanguageProviderService) => {
    expect(service).toBeTruthy();
  }));
});
