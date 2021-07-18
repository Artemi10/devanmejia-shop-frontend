import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StockProduct} from '../../models/product/stock-product.model';
import {PriceRange} from '../../models/filter/price-range.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {FilterParam} from '../../models/filter/filter-param.model';



@Injectable({
  providedIn: 'root'
})
export class StockProductService {
  private static PAGE_ELEMENTS_AMOUNT = 16;

  constructor(private http: HttpClient) {}

  public getStockProductsAmount(filterParam: FilterParam): Observable<any>{
    return this.http.post(`${environment.apiUrl}/shop/stockProducts/amount`, filterParam);
  }

  public getStockProductsByPage(page: number, filterParam: FilterParam): Observable<any>{
    const firstIndex = StockProductService.PAGE_ELEMENTS_AMOUNT * (page - 1);
    const lastIndex = StockProductService.PAGE_ELEMENTS_AMOUNT * page;
    return this.http.post(`${environment.apiUrl}/shop/stockProducts/${firstIndex}/${lastIndex}`, filterParam);
  }

  public getMaxValuePrice(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/stockProducts/price/max`);
  }
  public getMinValuePrice(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/stockProducts/price/min`);
  }
}

