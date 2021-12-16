import { TestBed } from '@angular/core/testing';

import { LandingPageGuard } from './landing-page.guard';

describe('LandingPageGuard', () => {
  let guard: LandingPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LandingPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
