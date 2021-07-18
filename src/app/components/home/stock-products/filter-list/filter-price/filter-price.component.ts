import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StockProductService} from '../../../../../services/stock-product/stock-product.service';
import {ActiveOrderService} from '../../../../../services/active-order/active-order.service';
import {PriceRange} from '../../../../../models/filter/price-range.model';

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent  {
  public isFilterListPriceIconOpen = false;
  public maxPriceValue = 0;
  public minPriceValue = 0;
  @Output() changeRangePriceEvent = new EventEmitter();

  constructor(private stockProductService: StockProductService, private activeOrderService: ActiveOrderService) {
    this.getMaxPriceValue();
    this.getMinPriceValue();
    this.activeOrderService.addProductToCartEvent
      .subscribe(() => {
        this.getMaxPriceValue();
        this.getMinPriceValue();
      });
  }

  public getMinPriceValue(): void{
    this.stockProductService.getMinValuePrice()
      .subscribe((value: number) => this.minPriceValue = value);
  }

  public getMaxPriceValue(): void{
    this.stockProductService.getMaxValuePrice()
      .subscribe((value: number) => this.maxPriceValue = value);
  }

  public clickIconListener(): void{
    this.isFilterListPriceIconOpen = !this.isFilterListPriceIconOpen;
  }

  public changeRangeEventListener(range: PriceRange): void{
    const minValue: number = range.minValuePrice * 100;
    const maxValue: number = range.maxValuePrice * 100;
    this.changeRangePriceEvent.emit(new PriceRange(maxValue, minValue));
  }

}
