import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartProduct} from "../../models/cart-product.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  constructor(private http:HttpClient) { }

  public getCartProductsFromOrder(orderId: number): Promise<Object>{
    return this.http.get(environment.apiUrl + `/api/cartProduct/${orderId}`).toPromise();
  }

  public addProductToCart(productName: string, productAmount: number): Promise<Object>{
    return this.http.post(environment.apiUrl + '/api/cartProduct', {productName: productName, productAmount: productAmount}).toPromise();
  }

  public addProduct(cartProduct:CartProduct){
    cartProduct.amount += 1;
  }
  public deleteProduct(cartProduct:CartProduct){
    cartProduct.amount -= 1;
    if(cartProduct.amount<0){
      cartProduct.amount=0;
    }
  }

}


