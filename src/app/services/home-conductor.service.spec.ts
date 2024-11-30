import { TestBed } from '@angular/core/testing';

import { HomeConductorService } from './home-conductor.service';

describe('HomeConductorService', () => {
  let service: HomeConductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
