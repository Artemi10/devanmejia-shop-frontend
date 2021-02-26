import { TestBed } from '@angular/core/testing';

import { CheckResetCodeGuard } from './check-reset-code.guard';

describe('CheckResetCodeGuard', () => {
  let guard: CheckResetCodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckResetCodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
