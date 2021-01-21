import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {StockProductService} from "../../../services/stock-product/stock-product.service";
import {StockProduct} from "../../../models/stock-product.model";
import {PriceRange} from "../../../models/price-range.model";



@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent{
  private currentPriceRange: PriceRange = null;

  constructor(public stockProductService: StockProductService) {}

  public changeRangePriceEventListener(value: PriceRange): void{
    this.stockProductService.filterStockProductsByPriceRange(value);
    this.currentPriceRange = value;
  }

  public clickLowToHighSortButtonEventListener(toSort: boolean): void{
    if(toSort){
      this.stockProductService.sortStockProductsLowToHigh();
    }else{
      this.stockProductService.sortStockProductsByName();
    }
  }

  public showStockProduct(stockProduct: StockProduct): boolean{
    return StockProductService.isStockProductShown(stockProduct) && stockProduct.productAmount != 0;
  }

  public clickHighToLowSortButtonEventListener(toSort: boolean): void{
    if(toSort){
      this.stockProductService.sortStockProductsHighToLow();
    }else{
      this.stockProductService.sortStockProductsByName();
    }
  }
}

