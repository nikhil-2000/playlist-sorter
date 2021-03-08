import { TestBed } from '@angular/core/testing';

import { ChoosePlaylistService } from './choose-playlist.service';

describe('ChoosePlaylistService', () => {
  let service: ChoosePlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosePlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
