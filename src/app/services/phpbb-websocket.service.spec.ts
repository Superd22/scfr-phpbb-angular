import { TestBed, inject } from '@angular/core/testing';

import { PhpbbWebsocketService } from './phpbb-websocket.service';

describe('PhpbbWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhpbbWebsocketService]
    });
  });

  it('should be created', inject([PhpbbWebsocketService], (service: PhpbbWebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
