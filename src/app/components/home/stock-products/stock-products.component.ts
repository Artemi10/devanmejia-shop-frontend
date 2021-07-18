import {Component} from '@angular/core';
import {StockProductService} from '../../../services/stock-product/stock-product.service';
import {StockProduct} from '../../../models/product/stock-product.model';
import {FilterParam, SortType} from '../../../models/filter/filter-param.model';
import {Type} from '../../../models/product/product.model';


@Component({
  selector: 'app-stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent {
  private static PRODUCTS_PAGE_AMOUNT = 12;
  public pages: number[];
  public stockProducts: StockProduct[];
  public pageNumber = 1;
  public filterParams: FilterParam;

  constructor(public stockProductService: StockProductService) {
    const productTypes: Type[] = Object.keys(Type).map(key => Type[key]);
    this.filterParams = new FilterParam(productTypes, null, SortType.NONE);
    this.getStockProducts();
    this.getStockProductsAmount();
  }

  public filterParamChangeListener(): void{
    this.pageNumber =  1;
    this.getStockProducts();
    this.getStockProductsAmount();
  }

  private getStockProducts(): void {
    this.stockProductService.getStockProductsByPage(this.pageNumber, this.filterParams)
      .subscribe((stockProducts: StockProduct[]) => this.stockProducts = stockProducts);
  }
  private getStockProductsAmount(): void{
    this.stockProductService.getStockProductsAmount(this.filterParams)
      .subscribe((amount: number) => {
        const pagesAmount = Math.ceil(amount / StockProductsComponent.PRODUCTS_PAGE_AMOUNT);
        this.pages = Array.from(Array(pagesAmount).keys());
      });
  }

  public changePage(pageNumber: number): void{
    this.pageNumber = pageNumber;
    this.getStockProducts();
  }


}

