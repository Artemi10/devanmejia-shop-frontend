import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockProduct} from "../../models/stock-product.model";
import {PriceRange} from "../../models/price-range.model";
import {environment} from "../../../environments/environment";
import {AuthorizationService} from "../authorization/authorization.service";


@Injectable({
  providedIn: 'root'
})
export class StockProductService {
  public priceRangeStockProducts: StockProduct[];

  constructor(private http:HttpClient) {
    this.getAllStockProducts();
  }

  public getAllStockProducts(): void{
    this.http.get(environment.apiUrl + '/api/stockProducts')
      .subscribe((stockProducts: StockProduct[]) =>{
        this.priceRangeStockProducts = stockProducts;
        this.priceRangeStockProducts.forEach((stockProduct:StockProduct) => {
          stockProduct.isChosenCategoryType = true;
          stockProduct.isChosenPriceRange = true;
        })
        this.sortStockProductsByName();
      });
  }

  public getMaxValuePrice(): number{
    let maxPriceValue: number = 0;
    for (let stockProduct of this.priceRangeStockProducts) {
      if (maxPriceValue < stockProduct.productPrice && StockProductService.isStockProductShown(stockProduct)) {
        maxPriceValue = stockProduct.productPrice;
      }
    }
    return maxPriceValue;
  }
  public getMinValuePrice(): number{
    if (this.priceRangeStockProducts.length != 0){
      let minPriceValue: number = Number.MAX_SAFE_INTEGER;
      for(let stockProduct of this.priceRangeStockProducts){
        if(minPriceValue > stockProduct.productPrice && StockProductService.isStockProductShown(stockProduct)){
          minPriceValue = stockProduct.productPrice;
        }
      }
      if(minPriceValue === Number.MAX_SAFE_INTEGER){
        return 0;
      }
      else{
        return minPriceValue;
      }
    }else{
      return 0;
    }
  }

  public sortStockProductsLowToHigh(): void{
    this.priceRangeStockProducts.sort((a, b)=> a.productPrice >= b.productPrice? 1: -1);
  }
  public sortStockProductsHighToLow(): void{
    this.priceRangeStockProducts.sort((a, b)=> a.productPrice >= b.productPrice? -1: 1);
  }
  public sortStockProductsByName(): void{
    this.priceRangeStockProducts.sort((a, b)=> a.productName >= b.productName? 1: -1);
  }


  public filterStockProductsByPriceRange(priceRange: PriceRange): void{
    this.priceRangeStockProducts
      .forEach((stockProduct) => stockProduct.isChosenPriceRange = stockProduct.productPrice >= priceRange.minValuePrice && stockProduct.productPrice <= priceRange.maxValuePrice);
  }
  public setStockProductsFilterByCategoryType(categoryTypeName: string): void{
    this.priceRangeStockProducts.forEach((stockProduct) =>{
        if(stockProduct.productType === categoryTypeName) {
          stockProduct.isChosenCategoryType = true;
        }
      });
  }
  public deleteStockProductsFilterByCategoryType(categoryTypeName: string): void{
    this.priceRangeStockProducts.forEach((stockProduct) => {
        if(stockProduct.productType === categoryTypeName) {
          stockProduct.isChosenCategoryType = false;
        }
      });
  }

  public static isStockProductShown(stockProduct: StockProduct): boolean{
    return stockProduct.isChosenPriceRange && stockProduct.isChosenCategoryType;
  }



}

