import {Type} from '../product/product.model';
import {PriceRange} from './price-range.model';

export class FilterParam{
  public productTypes: Type[];
  public priceRange: PriceRange;
  public sortType: SortType;

  constructor(productTypes: Type[], priceRange: PriceRange, sortType: SortType) {
    this.productTypes = productTypes;
    this.priceRange = priceRange;
    this.sortType = sortType;
  }
}

export enum SortType{
  HIGH_LOW = 'HIGH_LOW',
  LOW_HIGH = 'LOW_HIGH',
  NONE = 'NONE'
}
