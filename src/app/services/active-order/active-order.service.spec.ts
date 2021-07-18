import { TestBed } from '@angular/core/testing';
import {ActiveOrderService} from './active-order.service';



describe('ActiveOrderService', () => {
  let service: ActiveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
