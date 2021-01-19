import { TestBed } from '@angular/core/testing';

import { StockProductService } from './stock-product.service';

describe('CartProductService', () => {
  let service: StockProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
