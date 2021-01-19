import { TestBed } from '@angular/core/testing';

import { ActiveOrder } from './active-order.service';

describe('ActiveOrderService', () => {
  let service: ActiveOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveOrder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
